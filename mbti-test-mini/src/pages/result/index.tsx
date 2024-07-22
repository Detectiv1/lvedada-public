import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import headerBg from "../../assets/images/headerBg.jpg";
import "./index.scss";
import GlobalFooter from "../../components/GlobalFooter";
import questionResults from "../../data/question_results.json";
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro";
import {getBestQuestionResult} from "../../uilts/bizUtils";
import questions from "../../data/questions.json";
// 测试结果页面
export default () => {
  //获取答案
  const answerList = Taro.getStorageSync("answerList");
  if(!answerList || answerList.length < 1) {
    Taro.showToast({
      title: '请先完成测试',
      icon: 'none',
      duration: 3000,
    });
  }
  //获取测试结果
  const result = getBestQuestionResult(answerList, questions ,questionResults);
  return (
    <View className="resultPage">
      <Image className="headerBg" src={headerBg} />
      <AtButton
        type='primary'
        circle
        className='enterBtn'
        onClick={() => {
          Taro.reLaunch({
            url: "/pages/index/index",
          });
        }}
      >
        返回主页
      </AtButton>
      <View className='at-article__h1 title'>{result.resultName}</View>

      <View className='at-article__h3 subtitle'>{result.resultDesc}</View>

      <GlobalFooter></GlobalFooter>
    </View>
  );
};
