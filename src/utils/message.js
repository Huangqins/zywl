import { Message } from 'iview'

export default function message(type, info) {
    return Message[type]({
        content: `${info}`,
        top: 50,
        duration: 3
    })
}