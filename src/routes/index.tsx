import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import AddEditNewsPage from 'features/news/pages/AddEditNewsPage';
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed',
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const isLogIn = Boolean(localStorage.getItem('access_token'));
  return useRoutes([
    // Dashboard Routes
    {
      path: 'dashboard',
      element: isLogIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/one" replace /> },
        { path: 'one', element: <PageOne /> },
        { path: 'two', element: <PageTwo /> },
        { path: 'three', element: <PageThree /> },
        {
          path: 'app',
          children: [
            {
              path: '/',
              element: <Navigate to="/dashboard/app/four" replace />,
            },
            { path: 'four', element: <PageFour /> },
            { path: 'five', element: <PageFive /> },
            { path: 'six', element: <PageSix /> },
          ],
        },
        {
          path: 'campaigns',
          children: [
            { path: '/', element: <CampaignListPage /> },
            { path: 'add', element: <AddEditCampaignPage /> },
            { path: 'edit/:campaignId', element: <AddEditCampaignPage /> },
            { path: 'details/:campaignId', element: <CampaignDetailsPage /> },
            { path: 'details/:campaignId/:tag', element: <CampaignDetailsPage /> },
          ],
        },
        {
          path: 'packages',
          children: [
            { path: '/', element: <ComingSoon /> },
            { path: 'add', element: <AddEditCampaignPackagePage /> },
            { path: 'add/:campaignId', element: <AddEditCampaignPackagePage /> },
            { path: 'edit/:packageId', element: <AddEditCampaignPackagePage /> },
            { path: 'edit/:packageId/:campaignId', element: <AddEditCampaignPackagePage /> },
          ],
        },
        {
          path: 'stages',
          children: [
            { path: '/', element: <ComingSoon /> },
            { path: 'add', element: <AddEditStagePage /> },
            { path: 'add/:campaignId', element: <AddEditStagePage /> },
            { path: 'edit/:stageId', element: <AddEditStagePage /> },
            { path: 'edit/:stageId/:campaignId', element: <AddEditStagePage /> },
          ],
        },
        {
          path: 'risks',
          children: [
            { path: '/', element: <ComingSoon /> },

            { path: 'add/:campaignId', element: <AddEditRiskPage /> },

            { path: 'edit/:riskId/:campaignId', element: <AddEditRiskPage /> },
          ],
        },
        {
          path: 'locations',
          children: [
            { path: '/', element: <ComingSoon /> },

            { path: 'add/:campaignId', element: <ComingSoon /> },

            { path: 'edit/:locationId/:campaignId', element: <ComingSoon /> },
          ],
        },
        {
          path: 'news',
          children: [
            { path: '/', element: <ComingSoon /> },

            { path: 'add/:campaignId', element: <AddEditNewsPage /> },

            { path: 'edit/:locationId/:campaignId', element: <ComingSoon /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ path: '/', element: <LandingPage /> }],
    },
    { path: '/login', element: <Login /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Dashboard
const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));

// new
const Login = Loadable(lazy(() => import('features/auth/Login')));
const CampaignListPage = Loadable(lazy(() => import('features/campaign/pages/CampaignListPage')));
const AddEditCampaignPage = Loadable(
  lazy(() => import('features/campaign/pages/AddEdiitCampaignPage'))
);
const CampaignDetailsPage = Loadable(
  lazy(() => import('features/campaign/pages/CampaignDetailsPage'))
);
const ComingSoon = Loadable(lazy(() => import('pages/ComingSoon')));
const AddEditCampaignPackagePage = Loadable(
  lazy(() => import('features/package/pages/AddEditPackagePage'))
);
const AddEditStagePage = Loadable(lazy(() => import('features/stage/pages/AddEditStagePage')));
const AddEditRiskPage = Loadable(lazy(() => import('features/risk/pages/AddEditRiskPage')));
