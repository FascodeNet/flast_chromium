import { ElectronBlocker } from '@cliqz/adblocker-electron';
import Datastore from '@seald-io/nedb';
import { DownloadItem, Extension, Session } from 'electron';
import { ElectronChromeExtensions } from 'electron-chrome-extensions-production';
import {
    BookmarkData,
    ContentType,
    DataGroup,
    DownloadData,
    HistoryData,
    OmitData,
    SiteContentCookieData,
    SiteContentData,
    SiteContentZoomLevelData,
    SiteData,
    SitePermissionData,
    UserConfig,
    UserType
} from '../../interfaces/user';
import { DeepPartial } from '../../utils';
import { ViewManager } from '../manager/view';
import { PermissionType } from '../session/permission';
import { ThemeData } from '../user/theme';

export interface IUser {

    readonly id: string;

    readonly type: UserType;

    get name(): string;

    get avatar(): string | null;

    get session(): ISession;

    get bookmarks(): IBookmarks;

    get history(): IHistory;

    get downloads(): IDownloads;

    get extensions(): IExtensions;

    get settings(): ISettings;

    get adBlocker(): IAdBlocker;

    get sites(): ISites;

    get viewManager(): ViewManager;
}

export interface ISession {

    readonly user: IUser;

    downloadItems: Map<string, DownloadItem>;

    get session(): Session;

    get extensions(): ElectronChromeExtensions;
}

export interface IBookmarks {

    readonly user: IUser;

    get datastore(): Datastore;

    get bookmarks(): Required<BookmarkData>[];

    get folders(): Required<BookmarkData>[];

    add(data: OmitData<BookmarkData>): Promise<Required<BookmarkData>>;

    remove(id: string): Promise<boolean>;

    update(id: string, data: OmitData<BookmarkData>): Promise<Required<BookmarkData>>;
}

export interface IHistory {

    readonly user: IUser;

    get datastore(): Datastore;

    get history(): Required<HistoryData>[];

    get historyGroups(): DataGroup<Required<HistoryData>>[];

    add(data: OmitData<HistoryData>): Promise<Required<HistoryData>>;

    remove(id: string): Promise<boolean>;
}

export interface IDownloads {

    readonly user: IUser;

    get datastore(): Datastore;

    get downloads(): Required<DownloadData>[];

    get downloadGroups(): DataGroup<Required<DownloadData>>[];

    add(data: OmitData<DownloadData>): Promise<Required<DownloadData>>;

    remove(id: string): Promise<boolean>;

    update(id: string, data: OmitData<DownloadData>): Promise<Required<DownloadData>>;
}

export interface IExtensions {

    readonly user: IUser;

    load(id: string): Promise<Extension | undefined>;

    unload(id: string): void;

    loads(): Promise<Extension[]>;
}

export interface ISettings {

    readonly user: IUser;

    get theme(): ThemeData | undefined;

    get startupUrls(): string[];

    get homeUrl(): string;

    get newTabUrl(): string;

    get config(): UserConfig;

    set config(data: DeepPartial<UserConfig>);
}

export interface IAdBlocker {

    readonly user: IUser;

    get blocker(): ElectronBlocker | undefined;

    enable(): boolean;

    disable(): boolean;

    reload(): Promise<ElectronBlocker>;
}

export interface ISites {

    readonly user: IUser;

    get datastore(): Datastore;

    get sites(): Required<SitePermissionData | SiteContentData | SiteContentCookieData | SiteContentZoomLevelData>[];

    get permissions(): Required<SitePermissionData>[];

    get contents(): Required<SiteContentData>[];

    get cookies(): Required<SiteContentCookieData>[];

    get zoomLevels(): Required<SiteContentZoomLevelData>[];

    getPermission(origin: string, type: PermissionType): Required<SitePermissionData> | undefined;

    getContent(origin: string, type: ContentType): Required<SiteContentData> | undefined;

    add<T extends SiteData>(data: OmitData<T>): Promise<Required<T>>;

    remove(id: string): Promise<boolean>;

    update<T extends SiteData>(id: string, data: OmitData<T>): Promise<Required<T>>;
}
