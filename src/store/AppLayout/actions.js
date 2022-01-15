export function updateDrawer (context, data) {
  context.commit('updateDrawer', data)
}
// --------------------------------------------------layout ---------------------

export function setHeaderWithBackground (context, data) {
  context.commit('updateHeaderWithBackground', data)
  context.commit('updateHeaderShowTitle', !data)
  context.commit('updateHeaderShowBtnSearch', !data)
  context.commit('updateHeaderShowBtnBack', !data)
  context.commit('updateHeaderShowBtnShare', !data)
}

export function showHeaderWithSearch (context, data) {
  context.commit('headerShowTitle', true)
  context.commit('updateHeaderTitle', data)
  context.commit('updateHeaderTitleCentered', false)
  context.commit('updateHeaderShowBtnSearch', true)
  context.commit('updateHeaderShowBtnBack', false)
  context.commit('updateHeaderShowBtnShare', false)
}

export function showHeaderWithBackBtn (context, data) {
  context.commit('headerShowTitle', true)
  context.commit('updateHeaderTitle', data)
  context.commit('updateHeaderTitleCentered', true)
  context.commit('updateHeaderShowBtnSearch', false)
  context.commit('updateHeaderShowBtnBack', true)
  context.commit('updateHeaderShowBtnShare', false)
}

export function showHeaderWithBackAndShareBtn (context, data) {
  context.commit('headerShowTitle', true)
  context.commit('updateHeaderTitle', data)
  context.commit('updateHeaderTitleCentered', true)
  context.commit('updateHeaderShowBtnSearch', false)
  context.commit('updateHeaderShowBtnBack', true)
  context.commit('updateHeaderShowBtnShare', true)
}
