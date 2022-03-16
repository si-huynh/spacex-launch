export function SwitchCase({ object, matcher, replacer, transformer }: any): object {
    if (object instanceof Array) {
        return object.map((item) => SwitchCase({ matcher, object: item, replacer, transformer }))
    } else if (object && object.constructor === Object) {
        return Object.keys(object).reduce((buffer, key) => {
            const newKey = key.replace(matcher, replacer)
            // @ts-ignore
            buffer[newKey] = SwitchCase({
                matcher,
                object: object[key],
                replacer,
                transformer,
            })
            return buffer
        }, {})
    }

    return transformer ? transformer(object) : object
}

export function Camelize(object: any, transformer: any): object {
    return SwitchCase({
        matcher: /(_)(.)/g,
        object,
        // @ts-ignore
        replacer: ([, char]) => char.toUpperCase(),
        transformer,
    })
}

export function simpleDateString(date: string): string {
    const format = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }
    return new Date(date).toLocaleDateString('en-US', format)
}

export function simpleTimeString(date: string): string {
    const format = {
        hour: 'numeric',
        minute: 'numeric',
    }
    return new Date(date).toLocaleTimeString('en-US', format)
}
