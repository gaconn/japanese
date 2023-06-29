/**
 * lecture vocabulary/gramma
 */
export async function InitData(lecture, lesson) {
    var data = await getData(lecture, lesson)
    return data
}

function getData(lecture, lesson) {
    var dir = ""
    if(lecture === "vocabulary") {
        dir = `data/chapter/${lesson}/${lecture}.json`
    } else {
        dir = `data/kanji/lesson${lesson}/kanji.json`
    }
    const promise = new Promise(
        (resolve, reject) =>fetch(dir)
        .then(data => data.json())
        .then((data) => {
            resolve(data)
        })
        .catch((err) => reject(err))
    )
    return promise
}