// routes
import { useTranslation } from 'react-i18next';
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);
const getIconPng = (name: string) => (
  <SvgIconStyle src={`/static/icons/sidebar/${name}.png`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  business: getIconPng('business'),
  project: getIconPng('project'),
  setting: getIconPng('settings'),
};

export default function SidebarConfig() {
  const { t } = useTranslation();

  const sidebarConfig = [
    {
      subheader: t('common.general'),
      items: [
        {
          title: t('common.dashboard'),
          path: PATH_DASHBOARD.general.pageFour,
          icon: ICONS.dashboard,
        },
      ],
    },
    {
      subheader: `${t('common.management')} ${t('common.project')}`,
      items: [
        {
          title: t('common.project'),
          path: PATH_DASHBOARD.campaign.root,
          icon: ICONS.project,
        },
        {
          title: 'quản lí ví',
          path: PATH_DASHBOARD.general.pageTwo,
          icon: ICONS.ecommerce,
        },
        {
          title: 'doanh nghiệp',
          path: PATH_DASHBOARD.general.pageThree,
          icon: ICONS.user,
        },
        // {
        //   title: t('common.agent'),
        //   path: PATH_DASHBOARD.agent.root,
        //   icon: ICONS.agent,
        // },
      ],
    },
    {
      subheader: t('common.system'),
      items: [{ title: t('setting.menu'), path: PATH_DASHBOARD.system.root, icon: ICONS.setting }],
    },
  ];
  return sidebarConfig;
}
