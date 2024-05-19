import { db } from '@/app/server/db/index'
import { type Headset, headsets } from '@/app/server/db/schema/headsets'
import { eq, SQLWrapper } from 'drizzle-orm'

/**
 * @param params.headsetName
 * @returns {Promise<Headset[]>}
 * @description Gets desired headset info from the database
 */
async function getHeadsetInfo( params: { headsetName: string } ): Promise<Headset[]> {
    const headset: Headset[] = await db
        .select()
        .from(headsets)
        .where(eq(headsets.name, params.headsetName))
        .execute()
    return headset;
}

/**
 * @description display the headset info  
 * @returns null
 */
export default async function HeadsetDetails( { params }: {
    params: {headsetName: string}
} ) {
    const headsetInfo = await getHeadsetInfo(params);

    return (
        <>
            <h1>Details about {params.headsetName} headset:</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price ($)</th>
                        <th>Channel Number</th>
                        <th>Channel List</th>
                        <th>Purpose</th>
                        <th>Portability</th>
                        <th>Company</th>
                        <th>Battery Life</th>
                    </tr>
                </thead>
                <tbody>
                    {headsetInfo.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.channelNumber}</td>
                            <td>{item.channelList}</td>
                            <td>{item.purpose}</td>
                            <td>{item.portability}</td>
                            <td>{item.company}</td>
                            <td>{item.batteryLife}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}