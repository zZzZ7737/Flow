export default function findLastNode(node) {
  let branch = node;
  while (branch.next) {
    branch = branch.next;
  }
  return branch;
}
