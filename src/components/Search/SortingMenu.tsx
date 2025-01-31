import React, { useMemo } from 'react'

import { useLocation } from '@gatsbyjs/reach-router'
import useFormatMessage from 'decentraland-gatsby/dist/hooks/useFormatMessage'
import useResponsive from 'decentraland-gatsby/dist/hooks/useResponsive'
import { navigate } from 'decentraland-gatsby/dist/plugins/intl'
import TokenList from 'decentraland-gatsby/dist/utils/dom/TokenList'
import { Dropdown } from 'decentraland-ui/dist/components/Dropdown/Dropdown'
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive'

import { getUrlFilters } from '../../helpers'

import './SortingMenu.css'

const SORT_KEY = 'order'

export default function SortingMenu() {
  const location = useLocation()
  const params = useMemo(() => new URLSearchParams(location.search), [location.search])
  const order = useMemo(() => (params.get('order') === 'ASC' ? 'ASC' : 'DESC'), [params])
  const arrowDirection = useMemo(() => (order === 'ASC' ? 'Downwards' : 'Upwards'), [order])
  const responsive = useResponsive()
  const isMobile = responsive({ maxWidth: Responsive.onlyMobile.maxWidth })

  const t = useFormatMessage()

  return (
    <Dropdown
      className={TokenList.join(['SortingMenu', arrowDirection])}
      direction={isMobile ? 'left' : 'right'}
      text={t(`navigation.search.sorting.${order}`) || ''}
    >
      <Dropdown.Menu>
        <Dropdown.Item
          text={t('navigation.search.sorting.DESC')}
          onClick={() => navigate(getUrlFilters(SORT_KEY, params, 'DESC'))}
        />
        <Dropdown.Item
          text={t('navigation.search.sorting.ASC')}
          onClick={() => navigate(getUrlFilters(SORT_KEY, params, 'ASC'))}
        />
      </Dropdown.Menu>
    </Dropdown>
  )
}
