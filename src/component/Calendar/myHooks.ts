/**
 * 📚 useMergeState 使用说明
 * 
 * 也就是说，如果用户传入了Value,那么我自己在组件的这些个维护value值的操作都不会生效的，只有用户自己改
 * 如果用户不想管，则我的维护逻辑会生效 ， 但是没有封装回调函数
 * 因此需要组件自己改了值以后调用回调函数onChange（mergeValue）
 * 如果封装的话，就是调用方传onChange给组件，组件传给钩子，每次组件调用setValue的时候，钩子自己判断执行onChange就行了，就可以当彻底的甩手掌柜，只管组件的维护值逻辑就好了
 * 
 * 【功能】同时支持受控/非受控模式的状态管理Hook
 * 
 * 【参数】
 * @param defaultStateValue - 保底默认值（当无props.value和props.defaultValue时生效）
 * @param props - 配置对象（可选）:
 *   - value: 受控值 → 传入后组件变为受控模式（用户控制状态）
 *   - defaultValue: 默认值 → 仅首次生效（非受控模式初始值）
 * 
 * 【返回值】[mergedValue, setStateValue]
 *   - mergedValue: 最终状态值（自动根据模式选择props.value或内部state）
 *   - setStateValue: 修改函数（在非受控模式下才会实际修改状态）
 * 
 * 【工作模式】
 * 1. 🎛️ 受控模式（props.value存在）：
 *    - setStateValue调用无效，状态完全由props.value控制
 *    - 适合需要外部完全控制组件的场景
 * 
 * 2. 🕹️ 非受控模式（props.value未定义）：
 *    - setStateValue可修改状态，props.defaultValue仅初始化生效
 *    - 适合组件自己管理状态的场景
 * 
 * 【示例】
 * const [value, setValue] = useMergeState('默认值', {
 *   value: props.value,       // 受控值（可选）
 *   defaultValue: '初始值'    // 非受控初始值（可选）
 * });
 */

import { useEffect, useRef, useState } from "react";


/**
 * 自定义合并状态Hook（类似React的useState但支持受控/非受控模式切换）
 * @param defaultStateValue - 默认状态值（当既无props.value也无props.defaultValue时使用）
 * @param props - 可选的配置对象，包含：
 *   - defaultValue: 默认值（非受控模式初始值）
 *   - value: 受控值（当传入时组件变为受控模式）
 * @returns [mergedValue, setStateValue] 元组：
 *   - mergedValue: 最终合并后的状态值
 *   - setStateValue: 修改内部状态的方法
 */
function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T,
    value?: T
  }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // 解构props中的配置值（安全访问）
  const { defaultValue, value: propsValue } = props || {};

  // 标记是否是首次渲染（避免首次渲染时不必要的更新）
  const isFirstRender = useRef(true);

  // 内部状态管理（优先级：props.value > props.defaultValue > defaultStateValue）
  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) {
      return propsValue!; // 优先使用受控值
    } else if (defaultValue !== undefined) {
      return defaultValue!; // 其次使用默认值
    } else {
      return defaultStateValue; // 最后使用传入的默认状态
    }
  });

  // 副作用：当受控值变化时的处理
  useEffect(() => {
    // 仅在非受控模式且非首次渲染时同步状态
    if (propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!);
    }
    // 标记首次渲染结束
    isFirstRender.current = false;
  }, [propsValue]);

  // 计算最终合并值（受控模式用props.value，非受控用内部state）
  const mergedValue = propsValue === undefined ? stateValue : propsValue;

  return [mergedValue, setStateValue];
}

export default useMergeState;