---
title: Hooks使用
date: 2021-07-22
tags: ["react"]
---
>Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
> Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）,而并非强制按照生命周期划分
<!--more-->

{{< codesandbox hooks-lsmnx >}}


### 自定义Hook

```javascript
const getFriendInfo = (name, callback) => {
	callback({ name, isOnline: true });
};

function useFriendStatus(name) {
	const [isOnline, setIsOnline] = useState(null);

	function handleStatusChange(status) {
		setIsOnline(status.isOnline);
	}

	useEffect(() => {
		getFriendInfo(name, handleStatusChange);
		return () => {
		};
	});
	return [isOnline];
}

function FriendStatus() {
	const [isOnline] = useFriendStatus("joey");
	if (isOnline === null) {
		return "Loading...";
	}
	return <h5>joey is {isOnline ? "Online" : "Offline"}</h5>;
}

```

### useLayoutEffect

useEffect在浏览器渲染完成后执行 useLayoutEffect在浏览器渲染前执行

### useRef

```javascript

const UseRefExample = () => {
	const [count, setCount] = useState(0);
	const btnRef = useRef(null);

	useEffect(() => {
		const onClick = () => {
			setCount(count + 1);
		};
		btnRef.current.addEventListener("click", onClick, false);
		return () => btnRef.current.removeEventListener("click", onClick, false);
	}, [count]);

	return (
		<div>
			<div>{count}</div>
			<button ref={btnRef}>click me</button>
		</div>
	);
};

function UseLayoutEffectExample() {
	const [n, setN] = useState(0);
	const onClick = () => {
		setN((i) => i + 1);
	};
	useEffect(() => {
		console.log("useEffect");
	});
	useLayoutEffect(() => {
		console.log("useLayoutEffect");
	});
	return (
		<div className="App">
			<h1>n: {n}</h1>
			<button onClick={onClick}>Click</button>
		</div>
	);
}
```

### useMemo & memo & useCallback

useMemo 可限制子组件随着父组件的render而render useCallback是useMemo的语法糖

```javascript
const Child = memo(({ data }) => {
	console.log("child render");
	return (
		<div>
			<div>child</div>
			<div>{data.name}</div>
		</div>
	);
});

const UseMemoExample = () => {
	console.log("Hook render...");
	const [count, setCount] = useState(0);
	const [name, setName] = useState("rose");

	// const data = useMemo(() => {
	//   return {
	//     name
	//   };
	// }, [name]);
	const data = useCallback(() => {
		return {
			name
		};
	}, [name]);
	return (
		<div>
			<div>{count}</div>
			<button onClick={() => setCount(count + 1)}>update count</button>
			<Child data={data} />
		</div>
	);
};
```

### useContext

themeContext.Provider & createContext & useContext 给组件提供上下文，使范围内可获取

```javascript
const themeContext = createContext(null);

const Child2 = () => {
	const { theme, setTheme } = useContext(themeContext);
	return (
		<button
			onClick={() => {
				setTheme(theme === "light" ? "dark" : "light");
			}}
		>
			{theme}
		</button>
	);
};

function UseThemeContext() {
	const [theme, setTheme] = useState("dark");
	return (
		<themeContext.Provider value={{ theme, setTheme }}>
			<div className="App">
				{theme}
				<Child2 />
			</div>
		</themeContext.Provider>
	);
}
```

### useReducer

useReducer

当你认为你写的一些数据可以放到一个对象内更好操作时就可使用useReducer

```javascript
const initial = {
	n: 0
};
const reducer = (state, action) => {
	if (action.type === "add") {
		return { n: state.n + action.number };
	} else if (action.type === "multi") {
		return { n: state.n * 2 };
	} else {
		throw new Error("unknown type");
	}
};

function UseReducerExample() {
	const [state, dispatch] = useReducer(reducer, initial);
	const { n } = state;
	const onClick = () => {
		dispatch({ type: "add", number: 1 });
	};
	const onClick2 = () => {
		dispatch({ type: "add", number: 2 });
	};
	return (
		<div className="App">
			<h1>n: {n}</h1>

			<button onClick={onClick}>+1</button>
			<button onClick={onClick2}>+2</button>
		</div>
	);
}
```

### useState & useEffect

最常用的

---

[react hooks 源码分析]()
