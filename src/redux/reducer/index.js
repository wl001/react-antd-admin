/*
    第二部 Reducer 数据处理
*/
import {type} from '../action/index'
const ininialState = {
    menuName:'首页'
}
export default (state = ininialState,action)=>{
    switch (action.type) {
        case type.SWITCH_MENU:
        return {
            //把原有状态结构出来 否则新状态就相当于清空以前的状态
            ...state,//保存原有的数据不变然后再后续添加或者修改状态
            menuName: action.menuName //返回新的值 但是不能把以前的值清空掉
        }
      
       
        default:
            return state;
    }
}