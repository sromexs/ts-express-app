import { NextFunction, Request, Response } from "express";
import { Schema, Model, Types } from "mongoose";
import mongoose from "mongoose";

export type TRoute = (req: Request, res: Response, next: NextFunction) => any;

export type TDuplicate = {
  auth?: string;
  title?: string;
};

export type IReceiveData = {
  auth?: string;
  data: {
    imgUrls: string[];
    html: string;
    title: string;
  };
};

export type ILoginData = {
  username: string;
  password: string;
};

export type ISubmitView = {
  title: string;
  url: string;
  req: any;
};

export type IView = {
  title: string;
  slug: string;
  ip: string;
  google: boolean;
  refer: string;
  time: number;
};

export type IPagesCount = {
  title: string;
  slug: string;
  ip: string;
  google: boolean;
  refer: string;
  time: number;
  count: number;
};

export interface IStatusDays {
  key: string;
  ips: number;
  views: number;
  pages: number;
  google: number;
}

export interface IRecent {
  url: string;
  ip: string;
  timestamp: number;
  google: boolean;
}

export interface INewVisit extends IRecent {
  sec: number;
}

export interface ITimeIp {
  ip: string;
  time: number;
}

export interface IUrlCount {
  url: string;
  count: number;
}

export interface ITitlesBody {
  auth: string;
  type: "read" | "get" | "set";
  array: string[];
  info: any;
}

export type TCmLog = {
  _id: string;
  ip: string;
  time: number;
};
