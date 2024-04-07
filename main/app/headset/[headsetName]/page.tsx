import { db } from '@/app/server/db/index'
// import { GET } from '@/app/server/api/headsets/id/route.ts'


export default function HeadsetDetails( { params }: {
    params: {headsetName: string}
} ) {
    return (
        <h1>Details about {params.headsetName} headset</h1>
    );
}

// Use GET Headset by ID route, then display returned data