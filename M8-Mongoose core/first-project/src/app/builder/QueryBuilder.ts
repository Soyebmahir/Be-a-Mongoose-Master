import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {

        this.modelQuery = modelQuery;
        this.query = query;

    }
    //search Query
    search(searchableFields: string[]) {
        const searchTerm = this.query.searchTerm
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({ //need to cover this [field]: { $regex: searchTerm, $options: "i" } in first bracket
                    [field]: { $regex: searchTerm, $options: "i" }
                }) as FilterQuery<T>)
            })
        }

        return this;
    }
    //filter Query
    filter() {
        const queryObj = { ...this.query }

        const excludeFields = ["searchTerm", "sort", 'limit', 'page', 'fields']
        excludeFields?.forEach((element) => delete queryObj[element]);
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

        return this;

    }
    //sort Query
    sort() {
        const sort = this?.query?.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort as string)
        return this
    }
    paginate() {
        const limit = Number(this?.query?.limit) || 1
        const page = Number(this?.query?.page) || 1
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit)
        return this;
    }
    fieldsLimiting() {
        const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'
        console.log({ fields });
        this.modelQuery = this.modelQuery.select(fields)
        return this
    }
}
export default QueryBuilder;