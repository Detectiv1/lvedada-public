import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import headerBg from "../../assets/images/headerBg.jpg";
import "./index.scss";
import GlobalFooter from "../../components/GlobalFooter";
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro";

const IndexPage = () => {
  const handleNavigation = () => {
    Taro.navigateTo({
      url: "/pages/doQuestion/index",
    }).catch((error) => {
      console.error("Navigation Error:", error);
    });
  };

  return (
    <View className='indexPage'>
      <Image className='headerBg' src={headerBg} />
      <AtButton
        type='primary'
        circle
        className='enterBtn'
        onClick={handleNavigation}
      >
        参加测试
      </AtButton>
      <View className='at-article__h1 title'>你的MBTI到底是什么!</View>
      <View className='at-article__h3 subtitle'>
        只需要五分钟让你更了解自己
      </View>
      <GlobalFooter />
    </View>
  );
};

export default IndexPage;
