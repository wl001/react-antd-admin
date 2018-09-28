/*
    第一步 Action 类型 以及方法
*/
export const type = {
    SWITCH_MENU:'SWITCH_MENU'
}

export function switchMenu(menuName){
    return{
        type: type.SWITCH_MENU,
        menuName
    }
}