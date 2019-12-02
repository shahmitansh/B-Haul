import React from 'react';
import './FiltersPanel.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { capitalize, capitalizeCamelCase } from '../../utils';

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from './components'

import ITEM_SCHEMA from '../../items.json';

class FiltersPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      global: {},
      local: {}
    };

    for (let filter of ITEM_SCHEMA.globalFilters) {
      if (filter.filterName in props.globalFilters) {
        this.state.global[filter.filterName] = props.globalFilters[filter.filterName].current;
      } else {
        this.state.global[filter.filterName] = filter.defaultOption;
      }
    }

    for (let category in ITEM_SCHEMA.categories) {
      this.state.local[category] = {};
      for (let filter of ITEM_SCHEMA.categories[category].localFilters) {
        if (filter.filterName in props.localFilters) {
          this.state.local[category][filter.filterName] = props.localFilters[filter.filterName].current;
        } else {
          this.state.local[category][filter.filterName] = filter.defaultOption;
        }
      }
    }
  }

  _applyFilters = () => {
    console.log(this.state);
    let urlParams = '?';
    for (let globalFilter in this.state.global) {
      urlParams += `${globalFilter}=${this.state.global[globalFilter]}&`
    }

    const localFilters = this.state.local[this.state.global.type.toLowerCase()];
    for (let localFilter in localFilters) {
      urlParams += `_${localFilter}=${localFilters[localFilter]}&`
    }

    window.location = `/map${urlParams.slice(0,-1)}`
  }

  _getFilterComponent = (filter, isGlobal) => {
    const type = this.state.global.type.toLowerCase();
    const val = isGlobal ? this.state.global[filter.filterName] : this.state.local[type][filter.filterName];
    let prompt;

    if (filter.filterType == 'dropdown') {
      prompt = (
        <Dropdown
          options={['All'].concat(filter.filterOptions)}
          value={val}
          className="dropdown-prompt"
          onChange={(target) => this.setState((state) => {
            if (isGlobal) {
              state.global[filter.filterName] = target.value;
            } else {
              state.local[state.global.type.toLowerCase()][filter.filterName] = target.value;
            }
            return state;
          })} />
      );
    } else if (filter.filterType == 'number') {
      const domain = [filter.filterOptions[0], filter.filterOptions[1]];
      const reversed = false;
      const sliderStyle = {
        position: 'relative',
        width: '100%'
      }
      const range = val.split(',');
      const values = [Number(range[0]), Number(range[1])];

      prompt = (
        <Slider
          mode={2}
          step={1}
          domain={domain}
          reversed={reversed}
          rootStyle={sliderStyle}
          values={values}
          onChange={(change) => {
            this.setState((state) => {
              if (isGlobal) {
                state.global[filter.filterName] = `${change[0]},${change[1]}`;
              } else {
                state.local[state.global.type.toLowerCase()][filter.filterName] = `${change[0]},${change[1]}`;
              }
              return state;
            });
          }}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={4}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      )
    }

    return (
      <div className="filter-item">
        <div className="filter-item-label">
          {capitalizeCamelCase(filter.filterName)}
        </div>
        <div className="filter-item-prompt">
          {prompt}
        </div>
      </div>
    );
  }

  render() {
    const type = this.state.global.type.toLowerCase();

    const globalPrompts = ITEM_SCHEMA.globalFilters.map(f => this._getFilterComponent(f, true));
    const localPrompts = type === 'all' || !(type in ITEM_SCHEMA.categories) ? [] : ITEM_SCHEMA.categories[type].localFilters.map(f => this._getFilterComponent(f, false));

    return (
      <div id="filters-container">
        <div id="filters">
          <div className="filter-section-title">
            Global Filters
          </div>
          <div id="global-filters">
            {globalPrompts}
          </div>
          {localPrompts.length > 0 &&
            <div className="filter-section-title">
              Filters for {capitalize(type)}
            </div>}
          {localPrompts.length > 0 &&
            <div id="local-filters">
              {localPrompts}
            </div>}
        </div>
        <a id="apply-filters" onClick={this._applyFilters}>
          APPLY FILTERS
        </a>
      </div>
    );
  }
}

export default FiltersPanel;
