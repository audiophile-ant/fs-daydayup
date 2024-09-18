import React, { useEffect } from 'react';

const LaunchPage = () => {
	useEffect(() => {
		console.log('LaunchPage')
	})
  return (
    <div className="App">
      <header>
        <h1>欢迎来到我的 React 页面!</h1>
        <p>
          这是一个简单的 React 页面模板。
        </p>
        <button onClick={() => alert('按钮被点击了!')}>
          点击我
        </button>
      </header>
    </div>
  );
}

export default LaunchPage;