const filteredUserBids = (filterKey) => {
    return(
        bids.filter((val) => {
            if(filterKey === ""){
                return val;
            }else if(val.biderId.includes(filterKey)){
                return val;
            }else return null
        })
        )
    }

const removeDuplicate = () => {
    let bidsWithoutDup = []
    filteredUserBids(user._id).forEach((element) => {
        bidsWithoutDup.length === 0 && bidsWithoutDup.push(element)
        if (bidsWithoutDup.length !== 0){
            bidsWithoutDup.forEach(newElement => {
                if(!newElement.productId.includes(element.productId)){
                    bidsWithoutDup.push(element)
                }
            })
        }
    });
    return bidsWithoutDup
}

export default removeDuplicate