import { Carrier } from "../carrier/carrier";
import { User } from "../carrier/user";

type props={
    formId:any
    allHeaders:any;
    data:any;
    userId:any
}
export const dataSet = async ({formId, allHeaders, data, userId}: props) => {
    // if(formId === "carrier"){
    //    const {f_headers, f_data} = await Carrier({allHeaders, data})
    //    return {f_headers, f_data}
    // }
    if(formId === "user"){
        const {f_headers, f_data} = await User({allHeaders, data, userId})
        return {f_headers, f_data}
     }
    const f_headers = allHeaders
    const f_data = data
    return {f_headers, f_data}
}