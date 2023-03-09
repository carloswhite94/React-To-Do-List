import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Input, Radio, Checkbox } from 'antd';

function Top(props) {
  const state = props.props;
  return (
    <div>
      <Input value={state.inputValue} onChange={(e) => state.setInputValue(e.target.value)} placeholder="请输入事项" style={{ width: 400 }} />
      <Button type="primary" onClick={state.addList}>添加待办</Button>
      <br></br>
    </div>
  )
}

function TodoList(props) {
  const [value, setValue] = useState(1);
  const state = props.props;
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    console.log(state.listArr);
    setValue(e.target.value);
  };
  const checkChange = (key,e) => {
    console.log(e);
    console.log(state);
    let newArr = state.listArr.slice();
    newArr.map(item => {
      if (item.key === key) {
        item.checked = !item.checked
      }
    })
    state.setListArr(newArr);
  }
  return (
    <div>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>全部</Radio>
        <Radio value={2}>已完成</Radio>
        <Radio value={3}>未完成</Radio>
      </Radio.Group>
      <ul>
        {/* {state.listArr} */}
        {state.listArr.filter(item => {
          if (value === 1) {
            return item
          } else if (value === 2) {
            return item.checked
          } else {
            return !item.checked
          }
        }).map(item => <Item props={item} key={item.key} checkChange={(e) => checkChange(item.key,e)} />)}
      </ul>
    </div>
  )
}

function Item(props) {
  const state = props.props;
  return (<li style={{ width: '300px', display: 'flex', justifyContent: 'space-between' }}>
    <Checkbox onClick={props.checkChange} checked={state.checked}></Checkbox>
    <div style={{ flex: '1', padding: '0 10px' }}>{state.inputValue}</div>
    <Button onClick={() => state.deleteItem(state.inputValue)} type="dashed" danger >
      删除
    </Button>
  </li>)
}

function Main() {
  const [inputValue, setInputValue] = useState('');
  const [listArr, setListArr] = useState([]);
  const stateRef = useRef(null);

  const addList = (e) => {
    if (inputValue === '') return;
    setListArr([...listArr, itemProps])
    setInputValue('')
  }

  const deleteItem = (itemKey) => {
    console.log(itemKey)
    const newArr = stateRef.value.filter((val) => val.key !== itemKey)
    console.log(newArr)
    setListArr(newArr)
  }

  useEffect(() => {
    stateRef.value = listArr
  })

  const topProps = {
    inputValue: inputValue,
    setInputValue: setInputValue,
    addList: addList
  }

  const listProps = {
    listArr: listArr,
    setListArr: setListArr,
  }

  const itemProps = {
    inputValue: inputValue,
    deleteItem: deleteItem,
    key: inputValue,
    checked: false,
  }

  return (
    <div>
      <Top props={topProps} />
      <TodoList props={listProps} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);


