// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------
export const PATH_AUTH = {
  homePage: path('', '/'),
};
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    pageOne: path(ROOTS_DASHBOARD, '/one'),
    pageTwo: path(ROOTS_DASHBOARD, '/two'),
    pageThree: path(ROOTS_DASHBOARD, '/three'),
    pageFour: path(ROOTS_DASHBOARD, '/three'),
  },
  app: {
    root: path(ROOTS_DASHBOARD, '/app'),
    pageFour: path(ROOTS_DASHBOARD, '/app/four'),
    pageFive: path(ROOTS_DASHBOARD, '/app/five'),
    pageSix: path(ROOTS_DASHBOARD, '/app/six'),
  },
  system: {
    root: path(ROOTS_DASHBOARD, '/settings'),
  },
  campaign: {
    root: path(ROOTS_DASHBOARD, '/campaigns'),
    add: path(ROOTS_DASHBOARD, '/campaigns/add'),
    edit: path(ROOTS_DASHBOARD, '/campaigns/edit'),
    details: path(ROOTS_DASHBOARD, '/campaigns/details'),
  },
  package: {
    root: path(ROOTS_DASHBOARD, '/packages'),
    add: path(ROOTS_DASHBOARD, '/packages/add'),
    edit: path(ROOTS_DASHBOARD, '/packages/edit'),
    details: path(ROOTS_DASHBOARD, '/packages/details'),
  },
  stage: {
    root: path(ROOTS_DASHBOARD, '/stages'),
    add: path(ROOTS_DASHBOARD, '/stages/add'),
    edit: path(ROOTS_DASHBOARD, '/stages/edit'),
    details: path(ROOTS_DASHBOARD, '/stages/details'),
  },
  risk: {
    root: path(ROOTS_DASHBOARD, '/risks'),
    add: path(ROOTS_DASHBOARD, '/risks/add'),
    edit: path(ROOTS_DASHBOARD, '/risks/edit'),
    details: path(ROOTS_DASHBOARD, '/risks/details'),
  },
  location: {
    root: path(ROOTS_DASHBOARD, '/locations'),
    add: path(ROOTS_DASHBOARD, '/locations/add'),
    edit: path(ROOTS_DASHBOARD, '/locations/edit'),
    details: path(ROOTS_DASHBOARD, '/locations/details'),
  },
  news: {
    root: path(ROOTS_DASHBOARD, '/news'),
    add: path(ROOTS_DASHBOARD, '/news/add'),
    edit: path(ROOTS_DASHBOARD, '/news/edit'),
    details: path(ROOTS_DASHBOARD, '/news/details'),
  },
};
