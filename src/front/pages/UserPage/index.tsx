import React, { useEffect } from 'react';

const UserPage = () => {
	useEffect(() => {
		console.log('LaunchPage')
	})
  return (
    <div className="App">
        {/* <h1>欢迎来到我的 React 页面!</h1>/ */}
        <div>
          这是一个简单的 React 页面模板。
        </div>
        <button onClick={() => alert('按钮被点击了!')}>
          点击我
        </button>
    </div>
  );
}

export default UserPage;