import request from '@/utils/request'

export default function updateAssets({ assetsName, assetsURL, assetsIP, assetsPort, assetsProto, assetsServers, assetsRegion, assetsType, assetsImportant, assetsOS, assetsManger, assetsCreatUser }) {
    return request({
        method: 'post',
        url: '/ZY/asset/updateAssets',
        data: {
            assetsName, assetsURL, assetsIP, assetsPort, assetsProto, assetsServers, assetsRegion, assetsType, assetsImportant, assetsOS, assetsManger, assetsCreatUser
        }
    })
}