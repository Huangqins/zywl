import request from '@/utils/request'

export default function assetAdd({ assetsName, assetsURL, assetsIP, assetsPort, assetsProto, assetsServers, assetsRegion, assetsType, assetsImportant, assetsOS, assetsManger, assetsCreatUser }) {
    return request({
        method: 'post',
        url: '/ZY/asset/addAssets',
        data: {
            assetsName, assetsURL, assetsIP, assetsPort, assetsProto, assetsServers, assetsRegion, assetsType, assetsImportant, assetsOS, assetsManger, assetsCreatUser
        }
    })
}