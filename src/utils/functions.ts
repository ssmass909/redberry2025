function mutableFilterCopyWithin<T>(array: T[], predicate: (item: T, index: number, arr: T[]) => boolean): void {
  let writeIndex = 0;

  for (let readIndex = 0; readIndex < array.length; readIndex++) {
    if (predicate(array[readIndex], readIndex, array)) {
      if (writeIndex !== readIndex) {
        array[writeIndex] = array[readIndex];
      }
      writeIndex++;
    }
  }

  array.length = writeIndex;
}

export default mutableFilterCopyWithin;
