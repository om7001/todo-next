import mongoose from 'mongoose'

export interface TodoType extends mongoose.Model<any> {
    title: string;
    description: string;
    status: boolean;
}

export interface ArgsType{
    _id?: string;
    title?: string;
    description?: string;
    status?: boolean;
}
