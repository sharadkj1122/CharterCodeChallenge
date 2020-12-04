import _ from "lodash";

export function paginate(items, pagenNmber, pageSize) {
  //  pageNUmner===currentPage//
  // console.log("itms:" + items);
  const startIndex = (pagenNmber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
