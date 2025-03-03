(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_d2517bbd._.js", {

"[project]/src/services/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getAnimeById": (()=>getAnimeById),
    "getAnimeList": (()=>getAnimeList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: 'https://api.jikan.moe/v4'
});
const getAnimeList = async (page = 1, query, filters)=>{
    const params = new URLSearchParams({
        page: page.toString(),
        limit: '24',
        ...query ? {
            q: query
        } : {},
        ...filters?.type ? {
            type: filters.type
        } : {},
        ...filters?.score ? {
            min_score: filters.score
        } : {},
        ...filters?.status ? {
            status: filters.status
        } : {},
        ...filters?.rating ? {
            rating: filters.rating
        } : {},
        ...filters?.genres.length ? {
            genres: filters.genres.join(',')
        } : {}
    });
    const response = await api.get(`/anime?${params}`);
    return response.data;
};
const getAnimeById = async (id)=>{
    const response = await api.get(`/anime/${id}/full`);
    return response.data;
};
api.interceptors.request.use(async (config)=>{
    await new Promise((resolve)=>setTimeout(resolve, 1000));
    return config;
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useAnime.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useAnimeDetail": (()=>useAnimeDetail),
    "useAnimeList": (()=>useAnimeList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
const useAnimeList = (page = 1, query, filters)=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'animeList',
            page,
            query,
            filters
        ],
        queryFn: {
            "useAnimeList.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAnimeList"])(page, query, filters)
        }["useAnimeList.useQuery"],
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        networkMode: 'always',
        placeholderData: {
            "useAnimeList.useQuery": (previousData)=>previousData
        }["useAnimeList.useQuery"]
    });
};
_s(useAnimeList, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useAnimeDetail = (id)=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'anime',
            id
        ],
        queryFn: {
            "useAnimeDetail.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAnimeById"])(id)
        }["useAnimeDetail.useQuery"],
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        networkMode: 'always'
    });
};
_s1(useAnimeDetail, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useAnimePage.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useAnimePage": (()=>useAnimePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAnime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAnime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lodash$2f$debounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lodash/debounce.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useAnimePage() {
    _s();
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [debouncedSearch, setDebouncedSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(search);
    const [showScrollTop, setShowScrollTop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: '',
        score: '',
        status: '',
        rating: '',
        genres: []
    });
    const { data, isFetching, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAnime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimeList"])(page, debouncedSearch, filters);
    const debouncedSetSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lodash$2f$debounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useAnimePage.useCallback[debouncedSetSearch]": (value)=>{
            setDebouncedSearch(value);
            setPage(1);
        }
    }["useAnimePage.useCallback[debouncedSetSearch]"], 500), [
        setDebouncedSearch,
        setPage
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAnimePage.useEffect": ()=>{
            return ({
                "useAnimePage.useEffect": ()=>{
                    debouncedSetSearch.cancel();
                }
            })["useAnimePage.useEffect"];
        }
    }["useAnimePage.useEffect"], [
        debouncedSetSearch
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAnimePage.useEffect": ()=>{
            if (!isFetching && data) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }["useAnimePage.useEffect"], [
        data,
        isFetching
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAnimePage.useEffect": ()=>{
            const handleScroll = {
                "useAnimePage.useEffect.handleScroll": ()=>{
                    setShowScrollTop(window.scrollY > 300);
                }
            }["useAnimePage.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll);
            return ({
                "useAnimePage.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["useAnimePage.useEffect"];
        }
    }["useAnimePage.useEffect"], []);
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const handleSearch = (value)=>{
        setSearch(value);
        debouncedSetSearch(value);
    };
    const handleClearSearch = ()=>{
        setSearch('');
        setDebouncedSearch('');
        debouncedSetSearch.cancel();
        setPage(1);
    };
    return {
        page,
        search,
        filters,
        data,
        isFetching,
        error,
        showScrollTop,
        setPage,
        setFilters,
        handleSearch,
        handleClearSearch,
        scrollToTop
    };
}
_s(useAnimePage, "WAcrnfoRxIMpxtOtDK36Ju/Cfdw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAnime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimeList"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/SearchBar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SearchBar": (()=>SearchBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-2.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
;
function SearchBar({ search, isFetching, onSearch, onClear }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Search anime...",
                    value: search,
                    onChange: (e)=>onSearch(e.target.value),
                    className: "w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                }, void 0, false, {
                    fileName: "[project]/src/components/SearchBar.tsx",
                    lineNumber: 19,
                    columnNumber: 5
                }, this),
                isFetching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute right-3 top-1/2 -translate-y-1/2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "w-4 h-4 animate-spin text-gray-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBar.tsx",
                        lineNumber: 28,
                        columnNumber: 7
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/SearchBar.tsx",
                    lineNumber: 27,
                    columnNumber: 6
                }, this) : search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClear,
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
                    "aria-label": "Clear search",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBar.tsx",
                        lineNumber: 36,
                        columnNumber: 8
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/SearchBar.tsx",
                    lineNumber: 32,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SearchBar.tsx",
            lineNumber: 18,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SearchBar.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, this);
}
_c = SearchBar;
var _c;
__turbopack_context__.k.register(_c, "SearchBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/constant/filters.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ANIME_GENRES": (()=>ANIME_GENRES),
    "ANIME_RATINGS": (()=>ANIME_RATINGS),
    "ANIME_SCORE": (()=>ANIME_SCORE),
    "ANIME_STATUS": (()=>ANIME_STATUS),
    "ANIME_TYPES": (()=>ANIME_TYPES)
});
const ANIME_TYPES = [
    'TV',
    'Movie',
    'OVA',
    'Special',
    'ONA',
    'Music'
];
const ANIME_SCORE = [
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
];
const ANIME_STATUS = [
    'Airing',
    'Complete',
    'Upcoming'
];
const ANIME_RATINGS = [
    'G',
    'PG',
    'PG-13',
    'R',
    'R+',
    'Rx'
];
const ANIME_GENRES = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Slice of Life',
    'Sports',
    'Supernatural',
    'Thriller'
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/AnimeFilters.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AnimeFilters": (()=>AnimeFilters)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$filters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/filters.ts [app-client] (ecmascript)");
;
;
;
function AnimeFilters({ filters, onFilterChange }) {
    const clearFilters = ()=>{
        onFilterChange({
            type: '',
            score: '',
            status: '',
            rating: '',
            genres: []
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-4 rounded-lg shadow-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSelect, {
                            label: "Type",
                            id: "type",
                            value: filters.type,
                            onChange: (value)=>onFilterChange({
                                    ...filters,
                                    type: value
                                }),
                            options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$filters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIME_TYPES"],
                            placeholder: "All Types"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnimeFilters.tsx",
                            lineNumber: 32,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSelect, {
                            label: "Minimum Score",
                            id: "score",
                            value: filters.score,
                            onChange: (value)=>onFilterChange({
                                    ...filters,
                                    score: value
                                }),
                            options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$filters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIME_SCORE"],
                            placeholder: "Any Score"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnimeFilters.tsx",
                            lineNumber: 42,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSelect, {
                            label: "Status",
                            id: "status",
                            value: filters.status,
                            onChange: (value)=>onFilterChange({
                                    ...filters,
                                    status: value
                                }),
                            options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$filters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIME_STATUS"],
                            placeholder: "All Status"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnimeFilters.tsx",
                            lineNumber: 52,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSelect, {
                            label: "Age Rating",
                            id: "rating",
                            value: filters.rating,
                            onChange: (value)=>onFilterChange({
                                    ...filters,
                                    rating: value
                                }),
                            options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$filters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIME_RATINGS"],
                            placeholder: "All Ratings"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnimeFilters.tsx",
                            lineNumber: 62,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterSelect, {
                            label: "Genre",
                            id: "genres",
                            value: filters.genres.length ? filters.genres[0] : '',
                            onChange: (value)=>onFilterChange({
                                    ...filters,
                                    genres: value ? [
                                        value
                                    ] : []
                                }),
                            options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$filters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIME_GENRES"],
                            placeholder: "All Genres"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnimeFilters.tsx",
                            lineNumber: 72,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AnimeFilters.tsx",
                    lineNumber: 30,
                    columnNumber: 5
                }, this),
                (filters.type || filters.score || filters.status || filters.rating || filters.genres.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex justify-end",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: clearFilters,
                        className: "px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnimeFilters.tsx",
                                lineNumber: 94,
                                columnNumber: 8
                            }, this),
                            "Clear All Filters"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnimeFilters.tsx",
                        lineNumber: 91,
                        columnNumber: 7
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/AnimeFilters.tsx",
                    lineNumber: 90,
                    columnNumber: 6
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AnimeFilters.tsx",
            lineNumber: 29,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AnimeFilters.tsx",
        lineNumber: 28,
        columnNumber: 3
    }, this);
}
_c = AnimeFilters;
function FilterSelect({ label, id, value, onChange, options, placeholder }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/AnimeFilters.tsx",
                lineNumber: 123,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                id: id,
                value: value,
                onChange: (e)=>onChange(e.target.value),
                className: "w-full px-3 py-2 h-10 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: placeholder
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnimeFilters.tsx",
                        lineNumber: 133,
                        columnNumber: 5
                    }, this),
                    options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: option,
                            className: "text-gray-900",
                            children: option
                        }, option, false, {
                            fileName: "[project]/src/components/AnimeFilters.tsx",
                            lineNumber: 135,
                            columnNumber: 6
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AnimeFilters.tsx",
                lineNumber: 128,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AnimeFilters.tsx",
        lineNumber: 122,
        columnNumber: 3
    }, this);
}
_c1 = FilterSelect;
var _c, _c1;
__turbopack_context__.k.register(_c, "AnimeFilters");
__turbopack_context__.k.register(_c1, "FilterSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/utils/index.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "truncateText": (()=>truncateText)
});
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/AnimeGrid.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AnimeGrid": (()=>AnimeGrid)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/index.ts [app-client] (ecmascript)");
;
;
;
;
function AnimeGrid({ data, isFetching }) {
    if (isFetching) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
            children: [
                ...Array(12)
            ].map(()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-200 h-[300px] rounded-lg mb-2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnimeGrid.tsx",
                            lineNumber: 19,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4 bg-gray-200 rounded w-3/4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnimeGrid.tsx",
                            lineNumber: 20,
                            columnNumber: 7
                        }, this)
                    ]
                }, `skeleton-${crypto.randomUUID()}`, true, {
                    fileName: "[project]/src/components/AnimeGrid.tsx",
                    lineNumber: 16,
                    columnNumber: 6
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/AnimeGrid.tsx",
            lineNumber: 14,
            columnNumber: 4
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
        children: data?.data?.map((anime, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `/anime/${anime.mal_id}`,
                className: "group hover:transform hover:scale-105 transition-transform duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-lg overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative h-[320px] w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: anime.images.webp.image_url,
                                alt: anime.title,
                                className: "object-cover",
                                fill: true,
                                priority: true,
                                sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnimeGrid.tsx",
                                lineNumber: 36,
                                columnNumber: 8
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AnimeGrid.tsx",
                            lineNumber: 35,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 h-[120px] flex flex-col justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-semibold text-lg line-clamp-2 text-black",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncateText"])(anime.title, 40)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AnimeGrid.tsx",
                                    lineNumber: 46,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-sm text-gray-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: anime.type
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnimeGrid.tsx",
                                            lineNumber: 50,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "⭐ ",
                                                anime.score
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AnimeGrid.tsx",
                                            lineNumber: 51,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AnimeGrid.tsx",
                                    lineNumber: 49,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AnimeGrid.tsx",
                            lineNumber: 45,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AnimeGrid.tsx",
                    lineNumber: 34,
                    columnNumber: 6
                }, this)
            }, anime.mal_id + anime.title + index, false, {
                fileName: "[project]/src/components/AnimeGrid.tsx",
                lineNumber: 30,
                columnNumber: 5
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/AnimeGrid.tsx",
        lineNumber: 28,
        columnNumber: 3
    }, this);
}
_c = AnimeGrid;
var _c;
__turbopack_context__.k.register(_c, "AnimeGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Pagination.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Pagination": (()=>Pagination)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Pagination({ page, hasNextPage, lastVisiblePage, onPageChange }) {
    const getPageNumbers = ()=>{
        const pages = [];
        const maxVisiblePages = 4;
        pages.push(1);
        if (page > 3) {
            pages.push('start-ellipsis');
        }
        for(let i = Math.max(2, page); i <= Math.min(page + maxVisiblePages, lastVisiblePage); i++){
            if (!pages.includes(i)) {
                pages.push(i);
            }
        }
        if (page + maxVisiblePages < lastVisiblePage - 1) {
            pages.push('end-ellipsis');
        }
        if (lastVisiblePage > 1 && !pages.includes(lastVisiblePage)) {
            pages.push(lastVisiblePage);
        }
        return pages;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 flex justify-center items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onPageChange(Math.max(1, page - 1)),
                disabled: page === 1,
                className: "px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 cursor-pointer",
                children: "Previous"
            }, void 0, false, {
                fileName: "[project]/src/components/Pagination.tsx",
                lineNumber: 47,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: getPageNumbers().map((pageNum)=>typeof pageNum === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-2",
                        children: "..."
                    }, pageNum, false, {
                        fileName: "[project]/src/components/Pagination.tsx",
                        lineNumber: 56,
                        columnNumber: 7
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onPageChange(pageNum),
                        disabled: pageNum === page,
                        className: `w-10 h-10 rounded-lg ${pageNum === page ? 'bg-blue-600 text-white' : 'bg-blue-400 hover:bg-blue-500'}`,
                        children: pageNum
                    }, `page-${pageNum}`, false, {
                        fileName: "[project]/src/components/Pagination.tsx",
                        lineNumber: 60,
                        columnNumber: 7
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Pagination.tsx",
                lineNumber: 53,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onPageChange(page + 1),
                disabled: !hasNextPage,
                className: "px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 cursor-pointer",
                children: "Next"
            }, void 0, false, {
                fileName: "[project]/src/components/Pagination.tsx",
                lineNumber: 74,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Pagination.tsx",
        lineNumber: 46,
        columnNumber: 3
    }, this);
}
_c = Pagination;
var _c;
__turbopack_context__.k.register(_c, "Pagination");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ScrollToTop.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ScrollToTop": (()=>ScrollToTop)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
;
;
function ScrollToTop({ visible, onClick }) {
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: "fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 z-50 cursor-pointer",
        "aria-label": "Scroll to top",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
            size: 24
        }, void 0, false, {
            fileName: "[project]/src/components/ScrollToTop.tsx",
            lineNumber: 16,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ScrollToTop.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, this);
}
_c = ScrollToTop;
var _c;
__turbopack_context__.k.register(_c, "ScrollToTop");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAnimePage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAnimePage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SearchBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnimeFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AnimeFilters.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnimeGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AnimeGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Pagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Pagination.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollToTop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ScrollToTop.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function Home() {
    _s();
    const { page, search, filters, data, isFetching, error, showScrollTop, setPage, setFilters, handleSearch, handleClearSearch, scrollToTop } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAnimePage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimePage"])();
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4",
        children: "Error loading anime list"
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 26,
        columnNumber: 20
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "container mx-auto px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-bold mb-8",
                children: "Anime Explorer"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 30,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchBar"], {
                search: search,
                isFetching: isFetching,
                onSearch: handleSearch,
                onClear: handleClearSearch
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 32,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnimeFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimeFilters"], {
                filters: filters,
                onFilterChange: setFilters
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 39,
                columnNumber: 4
            }, this),
            !isFetching && data?.data?.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-gray-600",
                        children: "No anime found matching your criteria"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 43,
                        columnNumber: 6
                    }, this),
                    search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClearSearch,
                        className: "mt-4 text-blue-500 hover:text-blue-600",
                        children: "Clear search"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 47,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 42,
                columnNumber: 5
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnimeGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimeGrid"], {
                data: data,
                isFetching: isFetching
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 55,
                columnNumber: 5
            }, this),
            data && data?.data?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Pagination$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pagination"], {
                page: page,
                hasNextPage: data.pagination.has_next_page,
                lastVisiblePage: data.pagination.last_visible_page,
                onPageChange: setPage
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 59,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollToTop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollToTop"], {
                visible: showScrollTop,
                onClick: scrollToTop
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 67,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 29,
        columnNumber: 3
    }, this);
}
_s(Home, "PTQjEBBnHFKbEd6LrrgOc+TE5a4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAnimePage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimePage"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_d2517bbd._.js.map