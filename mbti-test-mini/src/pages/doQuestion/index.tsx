import { useEffect, useState } from "react";
import { View } from "@tarojs/components";
// import {AtBadge, AtButton} from "taro-ui";
import GlobalFooter from "../../components/GlobalFooter";
import questions from "../../data/questions.json";

import "./index.scss";
// eslint-disable-next-line import/first
import { AtButton, AtRadio } from "taro-ui";

// eslint-disable-next-line import/first
import Taro from "@tarojs/taro";

// 做题页面
export default () => {
  const handleNavigation = () => {
    Taro.navigateTo({
      url: "/pages/result/index",
    }).catch((error) => {
      console.error("Navigation Error:", error);
    });
  };
  const [current, setCurrent] = useState<number>(1);
  // 当前题目
  const [currentQusetion, setCurrentQuestion] = useState(questions[0]);
  const questionOptions = currentQusetion.options.map((option) => {
    return { label: `${option.key} .${option.value}`, value: option.key };
  });
  const [currentAnswer, setCurrentAnswer] = useState<string>();
  const [answerList] = useState<string[]>([]);
  // 序号变化时，更新当前题目和当前回答
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);
  }, [current]);
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <View className='doQuestionPage'>
      <View className='at-article__h1 title'>
        {current}.{currentQusetion.title}
      </View>
      <View className='options-wrapper'>
        <AtRadio
          options={questionOptions}
          value={currentAnswer}
          onClick={(value) => {
            setCurrentAnswer(value);
            // 记录回答
            answerList[current - 1] = value;
          }}
        />
      </View>
      {current < questions.length && (
        <AtButton
          type='primary'
          circle
          className='controlBtn'
          disabled={!currentAnswer}
          onClick={() => setCurrent(current + 1)}
        >
          下一题
        </AtButton>
      )}
      {current == questions.length && (
        <AtButton
          type='primary'
          circle
          className='controlBtn'
          disabled={!currentAnswer}
          onClick={() => {
            Taro.setStorageSync("answerList", answerList);
            handleNavigation();
          }}
        >
          查看结果
        </AtButton>
      )}
      {current > 1 && (
        <AtButton
          circle
          className='controlBtn'
          onClick={() => setCurrent(current - 1)}
        >
          上一题
        </AtButton>
      )}
      <GlobalFooter></GlobalFooter>
    </View>
  );
};
