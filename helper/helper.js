async function getNextSequence(database, name) {
    const result = await database.collection('counters').findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { returnDocument: 'after', upsert: true } 
    );

    return result.value ? result.value.seq : 1;
}

module.exports = { getNextSequence };
