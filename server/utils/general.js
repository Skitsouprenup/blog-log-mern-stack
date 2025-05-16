
export const filterPostQueries = (userQuery, filteredQuery) => {

    const acceptedKeys = [
        'title',
        'category',
        'author',
        'sort',
    ]

    for(const key of acceptedKeys) {
        //object[key] returns undefined if
        //key doesn't exist in the object
        if(userQuery[key] !== undefined) {
            switch(key) {
                case 'category'://fallthrough
                case 'author'://fallthrough
                    filteredQuery[key] = userQuery[key]
                    break
                case 'title':
                    filteredQuery[key] = { $regex: userQuery[key], $options: "i"}
                    break;
                case 'sort':
                    if(userQuery[key] === 'newest') {
                        filteredQuery[key] = {createdAt: -1}
                    }
                    if(userQuery[key] === 'oldest') {
                        filteredQuery[key] = {createdAt: 1}
                    }
                    if(userQuery[key] === 'popular') {
                        filteredQuery[key] = {visit_count: -1}
                    }
                    if(userQuery[key] === 'trending') {
                        filteredQuery[key] = {visit_count: -1}
                        filteredQuery['createdAt'] = {
                            //convert days to millis = days * hours * minutes * seconds * millis
                            //The result 5 days behind current date.
                            $gte: Date.now() - 5 * 24 * 60 * 60 * 1000
                        }
                    }
                    break
            }
        }
    }
}