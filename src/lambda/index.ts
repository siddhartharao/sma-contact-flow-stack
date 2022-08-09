import {processFlow } from '../../../sma-contact-flow-parser'

const amazonConnectInstanceID = "arn:aws:connect:us-east-1:352842279943:instance/f059f582-0cb4-4069-b4ac-2d649c883b3b";
const amazonConnectFlowID = "arn:aws:connect:us-east-1:352842279943:instance/f059f582-0cb4-4069-b4ac-2d649c883b3b/contact-flow/22f3d288-aef6-4bc5-b64e-2deef2be0897";

export async function main(event: any): Promise<any> {
    console.log(event);
    return await processFlow(event, amazonConnectInstanceID, amazonConnectFlowID);
}