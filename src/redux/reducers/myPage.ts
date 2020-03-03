export interface MyPage {
  name?: string;
}

const initialState: MyPage = {

};

const myPage = (state: MyPage = initialState, action: any) => {
  return state;
};

export default myPage;
