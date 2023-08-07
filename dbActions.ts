export async function tryDbAction(action) {
    try {
        await action();
        return success(params.Item);
    } catch (dbError) {
        console.log('error', dbError);
        return failure(dbError);
    }
}