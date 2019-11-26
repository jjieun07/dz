import React, { useState } from "react";
import "reset-css";
import styled from "styled-components";

const Root = styled.div`
  height: 100vh;
  background-color: #A5D6F1;
  display: flex;
  flex-direction: column;
`;

const NumberBoard = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const NumberSpan = styled.span`
  display: flex;
  flex: 1;
  font-size: 100px;
  font-weight: 600;
  color: white;
  align-items: center;
  justify-content: center;
`;

const InputBoard = styled.div`
  display: flex;
  flex: 0.5;
  align-items: center;
  justify-content: space-around;
`;

const Input = styled.input`
  flex: 0.5;
  font-size: 25px;
  text-align: center;
  height: 30%;
  border-radius: 50px;
  border-color: #50AEE1;
`;

const ButtonBoard = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const CircleButton = styled.button`
  color: white;
  background-color: ${props => (props.disabled ? "darkgray" : "gray")};
  height: 60px;
  width: 100px;
  border-radius: 50%;
  // cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border: 0px;
  outline: none;
  margin-left: 10px;
  font-size: 25px;

  &:hover {
    opacity: ${props => (props.disabled ? 1 : 0.5)};
  }

  &:first-child {
    margin: 0;
  }
`;

const App = () => {
  const [result, setResult] = useState(0);
  const [inputNum, setInputNum] = useState('');
  const [list, setList] = useState([0]);
  const [index, setIndex] = useState(0);

  const onChangeInput = e => {
    const num = parseInt(e.target.value)
    if(isNaN(num)) {
      setInputNum('')
    }
    else {
      setInputNum(num)
    }
  }

  const add = () => {
    const num = result + inputNum
    addList(num);
  }

  const sub = () => {
    const num = result - inputNum
    addList(num);
  }

  const addList = (num) => {      
    if(parseInt(num) === 0) return
    const i = index + 1;
    setResult(num)
    setInputNum('');

    setIndex(i);
    setList(list.slice(0, i).concat(num));
  }

  const onClickUndo = () => {
    const i = index - 1;
    setIndex(i);
    setResult(list[i]);
  }

  const onClickRedo = () => {
    const i = index + 1;
    setIndex(i);
    setResult(list[i])
  }

  return (
    <Root>
      <NumberBoard>
        <NumberSpan>{result}</NumberSpan>
      </NumberBoard>
      <InputBoard>
        <Input value={inputNum} onChange={onChangeInput} placeholder='정수를 입력하세요' />
      </InputBoard>
      <ButtonBoard>
        <CircleButton disabled={index === 0? true : false} onClick={onClickUndo}>Undo</CircleButton>
        <CircleButton
          onClick={add}>+</CircleButton>
        <CircleButton
          onClick={sub}>-</CircleButton>
        <CircleButton disabled={index === list.length-1? true : false} onClick={onClickRedo}>Redo</CircleButton>
      </ButtonBoard>
    </Root>
  )
};

export default App;
