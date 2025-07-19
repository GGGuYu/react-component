import React, { Suspense } from "react"

const LazyAaa = React.lazy(() => import('./component/TestLazy/Aaa'))

export function SuspenseTest() {
    return (
        <>
            <Suspense fallback={'lazyAaa加载中......'}>
                <LazyAaa></LazyAaa>
            </Suspense>
        </>
    )
}