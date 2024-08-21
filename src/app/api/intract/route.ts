import { NextResponse, NextRequest } from "next/server";
// import type { NextApiRequest, NextApiResponse } from 'next'

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const {address, twitter,discord, telegram, email} = await req.json();        
        // if(address != undefined)
        return NextResponse.json({
            "data": { // required, whether succxess or error
                "result": true
            }
       
        })
    } catch (error) {
        console.log(error);
        
        return Err
    }
}

const Err = NextResponse.json({
    "error": {
"code": 0,
"message": "something went wrong"
},
"data": { // required, whether success or error
"result": false
}
})