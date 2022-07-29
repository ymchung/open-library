const getRangeNumbers = (from, to) => {
    const range = [];

    for (let i = from; i <= to; i++) {
        range.push(i);
    }

    return range;
  };

export default getRangeNumbers;
