export function getActiveSectionId(ids: readonly string[], positions: readonly number[], threshold: number) {
  return ids.reduce((activeId, id, index) => positions[index] <= threshold ? id : activeId, ids[0] ?? '');
}
