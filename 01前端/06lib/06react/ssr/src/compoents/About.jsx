import React, { useContext } from "react";
import AboutPropsProvider from "../provider/AboutPropsProvider";

export default class About extends React.Component {
  static contextType = AboutPropsProvider;

  constructor () {
    // const props = useContext(AboutPropsProvider) 不能在类组件中直接使用
    super();
  }

  static async getInitProps(){
    // fetch data from remote
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          user: 'ljwGo',
          id: '1'
        });
      }, 1000);
    });
  }

  render() {
    const { user, id } = this.context;
    return <p>I am About Cmp. User in prop is {user}</p>
  }
}