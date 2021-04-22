function step(node, runtimeState, callback, loopBreaker) {
  switch (node.type) {
    case "start": {
      callback(node, runtimeState, loopBreaker.break);

      if (loopBreaker.shouldBreak) {
        return;
      }

      if (node.next) {
        step(
          node.next,
          {
            ...runtimeState,
            index: runtimeState.index + 1,
            prev: node,
          },
          callback,
          loopBreaker
        );
      }
      break;
    }

    case "single": {
      callback(
        node,
        { ...runtimeState, isBranchLastNode: !node.next },
        loopBreaker.break
      );

      if (loopBreaker.shouldBreak) {
        return;
      }

      if (node.next) {
        step(
          node.next,
          {
            ...runtimeState,
            index: runtimeState.index + 1,
            prev: node,
          },
          callback,
          loopBreaker
        );
      }

      break;
    }
    case "branch": {
      for (let i = 0; i < node.branches.length; i++) {
        callback(
          node.branches[i],
          {
            ...runtimeState,
            index: runtimeState.index + 1,
            prev: node.branches[i],
            parentNode: node,
            isBranchLastNode: !node.branches[i].next,
          },
          loopBreaker.break
        );

        if (loopBreaker.shouldBreak) {
          return;
        }

        if (node.branches[i].next) {
          step(
            node.branches[i].next,
            {
              ...runtimeState,
              index: runtimeState.index + 1,
              prev: node.branches[i],
              parentNode: node,
            },
            callback,
            loopBreaker
          );

          if (loopBreaker.shouldBreak) {
            return;
          }
        }
      }

      if (node.next) {
        step(
          node.next,
          {
            ...runtimeState,
            index: runtimeState.index + 1,
            prev: node,
          },
          callback,
          loopBreaker
        );
      }
      break;
    }

    case "end": {
      callback(node, runtimeState, loopBreaker.break);

      if (loopBreaker.shouldBreak) {
        return;
      }

      if (node.next) {
        step(
          node.next,
          {
            ...runtimeState,
            index: runtimeState.index + 1,
            prev: node,
          },
          callback,
          loopBreaker
        );
      }

      break;
    }

    default: {
      throw Error(`未识别节点类型:${node.type}`);
    }
  }
}

function forEach(startNode, callback) {
  const loopBreaker = {
    shouldBreak: false,
    break: () => {
      loopBreaker.shouldBreak = true;
    },
  };

  step(
    startNode,
    {
      level: 0,
      index: 0,
      parentNode: undefined,
      prev: undefined,
      isBranchLastNode: false,
      prevNode: undefined,
    },
    callback,
    loopBreaker
  );
}

export default forEach;
