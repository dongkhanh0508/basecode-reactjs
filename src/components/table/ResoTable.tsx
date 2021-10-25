/* eslint-disable prettier/prettier */
import editIcon from '@iconify/icons-eva/edit-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import trashIcon from '@iconify/icons-eva/trash-outline';
import { Icon } from '@iconify/react';
import { ClearAllOutlined, Replay, SettingsOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { useAntdTable } from 'ahooks';
import EmptyContent from 'components/EmptyContent';
import get from 'lodash/get';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TableFilterForm from './TableFilterForm';
// eslint-disable-next-line import/extensions
import { getCellValue, transformParamToHyphen } from './utils';

// const StickyLeftTableCell = withStyles((theme) => ({
//   head: {
//     left: 0,
//     position: 'sticky',
//     zIndex: theme.zIndex.appBar + 2,
//   },
//   body: {
//     minWidth: '50px',
//     left: '0',
//     position: 'sticky',
//     zIndex: theme.zIndex.modal,
//     backgroundColor: theme.palette.primary.main,
//   },
// }))(TableCell);

const StickyRightTableCell = withStyles((theme) => ({
  head: {
    // color: theme.palette.common.white,
    right: 0,
    position: 'sticky',
    zIndex: theme.zIndex.modal,
  },
  body: {
    minWidth: '50px',
    right: '0',
    position: 'sticky',
    zIndex: theme.zIndex.modal,
    // borderLeft: `1px solid ${theme.palette.grey[400]}`
  },
}))(TableCell);

const useStyle = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
  },
  actionColumn: {
    minWidth: '70px',
    width: '70px',
    justifyContent: 'flex-end',
  },
  stickyLeft: {
    width: '60px',
    position: 'sticky',
    left: (props: any) => props?.left ?? '0',
    // borderRight: `1px solid ${theme.palette.grey[400]}`
  },
  stickyRight: {
    textAlign: 'right',
    width: '60px',
    position: 'sticky',
    right: (props: any) => props?.right ?? '0',
    // borderLeft: `1px solid ${theme.palette.grey[400]}`
  },
  body: {},
}));
interface ResoTableProps {
  columns: any;
  dataSource?: any;
  pagination?: boolean;
  filters?: any;
  onEdit?: any;
  onDelete?: any;
  rowKey?: string;
  scroll?: any;
  showAction?: boolean;
  getData?: any;
  defaultFilters?: any;
  ref?: any;
  onPageChange?: (newPage: number) => void;
  onRowPerPageChange?: (perPage: number) => void;
  onSortChange?: (colName: string, sortType: number) => void;
  loading: boolean;
  totalNumberOfRecord: number;
  pageNumber: number;
}
// const initProps = {
//   columns: [],
//   dataSource: null,
//   pagination: true,
//   filters: null,
//   onEdit: null,
//   onDelete: null,
//   rowKey: 'id',
//   checkboxSelection: false,
//   onChangeSelection: () => null,
//   scroll: null,
//   showAction: true,
//   disabledSelections: [],
//   ref:null,
//   getData:null,
//   defaultFilters: {},
// } as ResoTableProps;
function ResoTable({
  columns,
  dataSource,
  pagination,
  filters,
  onEdit,
  onDelete,
  rowKey,
  scroll,
  showAction,
  getData,
  defaultFilters,
  ref,
  onPageChange,
  onRowPerPageChange,
  onSortChange,
  loading,
  totalNumberOfRecord,
  pageNumber,
}: ResoTableProps) {
  const classes = useStyle({});
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const form = useForm({
    defaultValues: defaultFilters,
  });
  const { control } = form;

  const _filters = useWatch({
    control,
  });

  const {
    tableProps,
    search,
    data,
    pagination: { changeCurrent, changePageSize },
  } = useAntdTable(
    (params) => {
      if (dataSource) return Promise.resolve(dataSource);
      return getData({
        ...transformParamToHyphen({ ...params.filters, ..._filters }),
        page: params.current,
        size: params.pageSize,
      });
    },
    {
      defaultPageSize: 10,
      defaultParams: [{ current: 1, pageSize: 10 }],
      formatResult: (res) => ({
        total: dataSource ? dataSource.length : res.data.metadata?.total,
        list: dataSource ?? res.data?.data ?? [],
        success: true,
      }),
      onError: (error) =>
        enqueueSnackbar(get(error, 'message', 'Some thing wrong'), {
          variant: 'error',
        }),
      refreshDeps: [dataSource, _filters],
      debounceInterval: 300,
      defaultLoading: true,
    }
  );
  const handelPageChange = (page: number) => {
    changeCurrent(page);
    if (!onPageChange) return;
    onPageChange(page);
  };
  const handelPageSizeChange = (pageSize: number) => {
    changePageSize(pageSize);
    if (!onRowPerPageChange) return;
    onRowPerPageChange(pageSize);
  };
  const { current, pageSize, total } = tableProps?.pagination ?? {};

  const [_columns, setColumns] = React.useState(columns ?? []);
  const [_anchorEl, setAnchorEl] = React.useState(null);
  const [_settingColEl, setSettingColEl] = React.useState(null);
  const [_openMenu, setOpenMenu] = React.useState(null);
  const mdUp = useMediaQuery((theme: any) => theme.breakpoints.up('md'));

  const openEditMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeEditMenu = () => {
    setAnchorEl(null);
  };

  React.useImperativeHandle(ref, () => ({
    reload: () => search?.submit(),
  }));

  const handleEdit = useCallback(
    (data) => {
      if (typeof onEdit === 'function') {
        onEdit(data);
      }
      closeEditMenu();
    },
    [onEdit]
  );

  const handleDelete = useCallback(
    (data) => {
      if (typeof onDelete === 'function') {
        onDelete(data);
      }
      closeEditMenu();
    },
    [onDelete]
  );

  const tableHeader = React.useMemo(() => {
    const headers = [..._columns].filter(({ hideInTable }) => !hideInTable);

    const tableHeaders: any = [];

    headers.forEach((header, index) => {
      const CellComp: any = TableCell;
      tableHeaders.push(
        <CellComp
          className={[classes.root, header.fixed === 'right' ? classes.stickyRight : ''].join(' ')}
          key={`header_${index}`}
          align={header.alignRight ? 'right' : 'left'}
          sx={{ left: 0 }}
        >
          <TableSortLabel hideSortIcon>
            <Typography variant="body1" noWrap>
              {getCellValue(header.title, null, header)}
            </Typography>
          </TableSortLabel>
        </CellComp>
      );
    });

    if (showAction) {
      tableHeaders.push(
        <StickyRightTableCell
          className={[classes.root, classes.actionColumn].join(' ')}
          key="column-action"
        >
          <TableSortLabel hideSortIcon>
            <span />
          </TableSortLabel>
        </StickyRightTableCell>
      );
    }

    return <TableRow>{tableHeaders}</TableRow>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    _columns,
    showAction,
    data?.list,
    classes.stickyLeft,
    classes.root,
    classes.stickyRight,
    classes.actionColumn,
    rowKey,
  ]);

  const tableBodyContent = React.useMemo(() => {
    if (!data) return;
    const body = [..._columns].filter(({ hideInTable }) => !hideInTable);
    const tableBodys: any = [];
    data?.list.forEach((data, idx) => {
      const bodyRow = body.map((column, index) => {
        const CellComp: any = TableCell;
        let cell;
        if (typeof column.render === 'function') {
          cell = column.render(get(data, column.dataIndex, '-'), data) ?? '-';
        } else {
          cell = (
            <Typography variant="subtitle2" noWrap>
              {column.dataIndex === 'index' ? idx + 1 : get(data, column.dataIndex, '-')}
            </Typography>
          );
        }

        return (
          <CellComp
            className={[
              index === 0 ? classes.stickyLeft : classes.body,
              column.fixed === 'right' && classes.stickyRight,
            ].join(' ')}
            left={0}
            key={`${column.title}-${data[rowKey || 0]}`}
            hover
          >
            {cell}
          </CellComp>
        );
      });

      if (showAction) {
        const ActionCell = mdUp ? (
          <StickyRightTableCell>
            <Stack direction="row" justifyContent="flex-end">
              <Tooltip title={t('common.btnEdit') || ''}>
                <IconButton onClick={() => handleEdit(data)} size="large">
                  <Icon icon={editIcon} />
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem />
              <Tooltip title={t('common.btnDelete') || ''}>
                <IconButton onClick={() => handleDelete(data)} sx={{ color: 'red' }} size="large">
                  <Icon icon={trashIcon} />
                </IconButton>
              </Tooltip>
            </Stack>
          </StickyRightTableCell>
        ) : (
          <StickyRightTableCell key={`edit-cell-${data[rowKey || 0]}`}>
            <IconButton
              onClick={(e) => {
                openEditMenu(e);
                setOpenMenu(data[rowKey || 0]);
              }}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              size="large"
            >
              <Icon icon={moreVerticalFill} />
            </IconButton>
            <Menu
              anchorEl={_anchorEl}
              MenuListProps={{
                'aria-labelledby': 'edit-menu',
              }}
              onClose={(e: any) => {
                closeEditMenu();
                setOpenMenu(null);
              }}
              open={data[rowKey || 0] === _openMenu}
              key={`menu-edit-${data[rowKey || 0]}`}
              id={`menu-edit-${data[rowKey || 0]}`}
            >
              <MenuItem onClick={() => handleEdit(data)}>
                <ListItemIcon>
                  <Icon icon={editIcon} />
                </ListItemIcon>
                <ListItemText>{t('common.btnEdit')}</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleDelete(data)} sx={{ color: 'red' }}>
                <ListItemIcon>
                  <Icon icon={trashIcon} />
                </ListItemIcon>
                <ListItemText>{t('common.btnDelete')}</ListItemText>
              </MenuItem>
            </Menu>
          </StickyRightTableCell>
        );

        bodyRow.push(ActionCell);
      }
      tableBodys.push(
        <TableRow hover onClick={() => {}} role="checkbox">
          {bodyRow}
        </TableRow>
      );
    });
    // eslint-disable-next-line consistent-return
    return tableBodys;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    _columns,
    showAction,
    classes.stickyLeft,
    classes.body,
    classes.stickyRight,
    rowKey,
    mdUp,
    _anchorEl,
    _openMenu,
    handleDelete,
    handleEdit,
  ]);

  const settingColumns = () => {
    const handleToggle = (col, idx) => {
      const updateColumns = [..._columns];
      updateColumns[idx].hideInTable = !updateColumns[idx].hideInTable;
      setColumns(updateColumns);
    };

    const showQuantity = _columns.reduce(
      (acc, { hideInTable }) => (!hideInTable ? acc + 1 : acc),
      0
    );

    const intermediate = showQuantity > 0 && showQuantity < _columns.length;

    const onToggleAll = () => {
      setColumns(
        _columns.map((col) => ({ ...col, hideInTable: !(showQuantity < _columns.length) }))
      );
    };

    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem disablePadding>
          <ListItemButton role={undefined} onClick={onToggleAll} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                indeterminate={intermediate}
                checked={showQuantity === _columns.length}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                noWrap: true,
              }}
              primary={t('common.columnSetting')}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        {_columns.map((col, idx) => {
          const labelId = `checkbox-list-label-${col.dataIndex}`;

          return (
            <ListItem key={col.dataIndex} disablePadding sx={{ paddingLeft: 1 }}>
              <ListItemButton role={undefined} onClick={() => handleToggle(col, idx)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={!col.hideInTable}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    noWrap: true,
                  }}
                  id={labelId}
                  primary={col.title}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <FormProvider {...form}>
      <Container style={{ padding: 0, maxWidth: '100%' }}>
        <Box py={2}>
          <TableFilterForm controls={columns} />
        </Box>
        <Box py={1}>
          <Stack direction="row">
            <Box ml="auto">
              <Stack spacing={1} direction="row">
                {form.formState.isDirty && (
                  <Button
                    startIcon={<ClearAllOutlined />}
                    onClick={() => form.reset({})}
                    disableRipple
                  >
                    {t('common.clearFilter')}
                  </Button>
                )}
                <IconButton size="small" onClick={search?.submit}>
                  {loading ? <CircularProgress style={{ width: 24, height: 24 }} /> : <Replay />}
                </IconButton>
                <IconButton size="small" onClick={(e: any) => setSettingColEl(e.currentTarget)}>
                  <SettingsOutlined />
                </IconButton>
                <Popover
                  open={Boolean(_settingColEl)}
                  anchorEl={_settingColEl}
                  onClose={() => setSettingColEl(null)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  {settingColumns()}
                </Popover>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table stickyHeader size="small">
            <TableHead>{tableHeader}</TableHead>

            <TableBody>
              {loading && (
                <TableRow style={{ height: 1 }}>
                  <TableCell colSpan={20} style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                    <LinearProgress color="primary" />
                  </TableCell>
                </TableRow>
              )}
              {tableBodyContent}
            </TableBody>
          </Table>
        </TableContainer>
        {!loading && !data?.list?.length && (
          <Box width="100%">
            <EmptyContent
              title={t('common.noData')}
              sx={{
                width: '100%',
              }}
            />
          </Box>
        )}
        {pagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            {...{ rowsPerPage: pageSize || 10, count: totalNumberOfRecord, page: pageNumber - 1 }}
            onPageChange={(_, page: any) => handelPageChange(page + 1 || 1)}
            onRowsPerPageChange={(e: any) => handelPageSizeChange(e.target.value || 1)}
          />
        )}
      </Container>
    </FormProvider>
  );
}

export default React.forwardRef(ResoTable);
