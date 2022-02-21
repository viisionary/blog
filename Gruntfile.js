const toml = require("toml");
const S = require("string");
const yaml = require('js-yaml');
const CONTENT_PATH_PREFIX = "./content";

module.exports = function (grunt) {
    grunt.registerTask("default", function () {
        grunt.log.writeln("Build pages index");
        const indexPages = function () {
            const pagesIndex = [];
            grunt.file.recurse(CONTENT_PATH_PREFIX, function (abspath, rootdir, subdir, filename) {
                if (abspath.includes('.DS_Store') || !abspath.includes('.md')) {
                    return;
                }
                grunt.verbose.writeln("Parse file:", abspath);
                pagesIndex.push(processFile(abspath, filename));
            });
            return pagesIndex;
        };

        var processFile = function (abspath, filename) {
            let pageIndex;

            if (S(filename).endsWith(".html")) {
                pageIndex = processHTMLFile(abspath, filename);
            } else {
                pageIndex = processMDFile(abspath, filename);
            }

            return pageIndex;
        };

        var processHTMLFile = function (abspath, filename) {
            const content = grunt.file.read(abspath);
            const pageName = S(filename).chompRight(".html").s;
            const href = S(abspath)
                .chompLeft(CONTENT_PATH_PREFIX).s;
            return {
                title: pageName,
                href: href,
                content: S(content).trim().stripTags().stripPunctuation().s
            };
        };

        var processMDFile = function (abspath, filename) {
            let content = grunt.file.read(abspath);
            let pageIndex;
            // First separate the Front Matter from the content and parse it

            content = content.split('---')
            let frontMatter;
            if (!content[1]) {
                return;
            }
            try {
                frontMatter = yaml.load(content[1].trim());

            } catch (e) {
                console.error('it error', e.message)
                // conzole.failed(e.message);
            } finally {

            }
            if (!frontMatter) {
                return;
            }
            let href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(".md").s;
            // href for index.md files stops at the folder name
            if (filename === "index.md") {
                href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).s;
            }

            pageIndex = {
                title: frontMatter.title,
                tags: frontMatter.tags,
                href: href.slice(8),
                content: S(content[2]).trim().stripTags().stripPunctuation().s
            };

            return pageIndex;
        };

        grunt.file.write("./static/js/lunr/PagesIndex.json", JSON.stringify(indexPages()));
        grunt.log.ok("Index built");
    });
};
