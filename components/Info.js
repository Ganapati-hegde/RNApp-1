import Toast from "react-native-toast-message";

const Info = () => {
  const showToast = Toast.show({
    type: "success",
    text1: "Hello",
    text2: "This is some something 👋",
  });
  <>{showToast}</>;
};
export default Info;
