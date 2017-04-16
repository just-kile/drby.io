var ftsGameParser = require('../../../src/backend/grabber/ftsGameParser');
var moment = require('moment');

describe("ftsGameParser", function () {

    const mockPage = `<div class="view-content">
    <table class="views-table sticky-enabled cols-40">
        <thead>
            <tr>
                <th class="views-field views-field-field-bout-date-value">
                    <a href="/bouts/wftda?order=field_bout_date_value&amp;sort=asc&amp;page=0" title="sort by Date" class="active">Date</a> </th>
                <th class="views-field views-field-nid-2">
                    Sanc. </th>
                <th class="views-field views-field-title">
                    <a href="/bouts/wftda?order=title&amp;sort=asc&amp;page=0" title="sort by Home Team" class="active">Home Team</a> </th>
                <th class="views-field views-field-field-bout-home-score-value">
                    <a href="/bouts/wftda?order=field_bout_home_score_value&amp;sort=asc&amp;page=0" title="sort by Score" class="active">Score</a> </th>
                <th class="views-field views-field-title-1">
                    <a href="/bouts/wftda?order=title_1&amp;sort=asc&amp;page=0" title="sort by Visitor Team" class="active">Visitor Team</a> </th>
                <th class="views-field views-field-field-bout-visitor-score-value">
                    <a href="/bouts/wftda?order=field_bout_visitor_score_value&amp;sort=asc&amp;page=0" title="sort by Score" class="active">Score</a> </th>
                <th class="views-field views-field-nid-1">
                    Score Diff </th>
                <th class="views-field views-field-title-2">
                    Tournament </th>
                <th class="views-field views-field-view-node">
                    Bout Stats </th>
            </tr>
        </thead>
        <tbody>
            <tr class="odd views-row-first official">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92181'></span><span class='time'></span> 4/15/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'>
                      <a href="/node/7773">Croydon</a>
                    </span>
                </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>118</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/19170">Dom City</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    117 </td>
                <td class="views-field views-field-nid-1">
                    1 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92176/overview">2017 Fantastic 8</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92181" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91892'></span><span class='time'></span> 4/15/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/teams/8957/overview">Rainy City (UK)</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    119 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/teams/8121/overview">Stockholm</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>127</span> </td>
                <td class="views-field views-field-nid-1">
                    8 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/91888/overview">Anarchy In The UK 6</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91892" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91891'></span><span class='time'></span> 4/15/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/teams/7771/overview">Crime City</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>176</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/teams/8114/overview">Helsinki</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    158 </td>
                <td class="views-field views-field-nid-1">
                    18 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/91888/overview">Anarchy In The UK 6</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91891" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91890'></span><span class='time'></span> 4/15/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/teams/3628/overview">London</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>336</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/teams/8121/overview">Stockholm</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    137 </td>
                <td class="views-field views-field-nid-1">
                    199 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/91888/overview">Anarchy In The UK 6</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91890" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92178'></span><span class='time'></span> 4/15/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/20688">Dresden</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>170</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/13215">Munich</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    116 </td>
                <td class="views-field views-field-nid-1">
                    54 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92176/overview">2017 Fantastic 8</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92178" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91889'></span><span class='time'></span> 4/15/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/teams/8957/overview">Rainy City (UK)</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    102 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/teams/8114/overview">Helsinki</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>154</span> </td>
                <td class="views-field views-field-nid-1">
                    52 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/91888/overview">Anarchy In The UK 6</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91889" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92177'></span><span class='time'></span> 4/15/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/7773">Croydon</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>237</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/7952">Sheffield</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    35 </td>
                <td class="views-field views-field-nid-1">
                    202 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92176/overview">2017 Fantastic 8</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92177" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92663'></span><span class='time'></span> 4/14/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/teams/3407/overview">Kansas City</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>281</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/3452">Omaha</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    92 </td>
                <td class="views-field views-field-nid-1">
                    189 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/91980/overview">Tri-State Tourney</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/bouts/92663/overview" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92153'></span><span class='time'></span> 4/14/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/25016">2x4</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>250</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/16741"><span title='Rock N Roller Queens'>Rock N Roller Quee<span class='ellipses'>...</span></span></a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    33 </td>
                <td class="views-field views-field-nid-1">
                    217 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92143/overview">Violentango5</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92153" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92152'></span><span class='time'></span> 4/14/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/25184">Sailor City</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>475</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/25409">Ladies of Hell</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    13 </td>
                <td class="views-field views-field-nid-1">
                    462 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92143/overview">Violentango5</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92152" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92151'></span><span class='time'></span> 4/14/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/node/25016">2x4</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    100 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/node/24782">Bone Breakers</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>139</span> </td>
                <td class="views-field views-field-nid-1">
                    39 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92143/overview">Violentango5</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92151" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92149'></span><span class='time'></span> 4/14/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/25184">Sailor City</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>531</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/25580">Gray City</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    3 </td>
                <td class="views-field views-field-nid-1">
                    528 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92143/overview">Violentango5</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/bouts/92149/overview" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92148'></span><span class='time'></span> 4/13/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/25016">2x4</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>523</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/25580">Gray City</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    9 </td>
                <td class="views-field views-field-nid-1">
                    514 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92143/overview">Violentango5</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92148" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92147'></span><span class='time'></span> 4/13/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/36754">Metropolitan</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>303</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/16741"><span title='Rock N Roller Queens'>Rock N Roller Quee<span class='ellipses'>...</span></span></a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    31 </td>
                <td class="views-field views-field-nid-1">
                    272 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92143/overview">Violentango5</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/bouts/92147/overview" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92146'></span><span class='time'></span> 4/13/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/25016">2x4</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>734</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/25409">Ladies of Hell</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    13 </td>
                <td class="views-field views-field-nid-1">
                    721 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92143/overview">Violentango5</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92146" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92144'></span><span class='time'></span> 4/13/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/25016">2x4</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>135</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/36754">Metropolitan</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    72 </td>
                <td class="views-field views-field-nid-1">
                    63 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92143/overview">Violentango5</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92144" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91474'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/teams/7696/overview">Columbia</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    112 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/teams/3425/overview">Madison</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>145</span> </td>
                <td class="views-field views-field-nid-1">
                    33 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/81519/overview"><span title='Southern Discomfort 2017'>Southern Discomfort 20<span class='ellipses'>...</span></span></a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91474" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92442'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/3638">Santa Cruz</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>177</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/13529">Ann Arbor</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    92 </td>
                <td class="views-field views-field-nid-1">
                    85 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92433/overview">2017 Boardwalk Empire</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/bouts/92442/overview" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92031'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/node/7929">Glasgow</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    54 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/node/11037">Antwerp</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>350</span> </td>
                <td class="views-field views-field-nid-1">
                    296 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92021/overview">West Track Story V</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92031" class="boutlink has-stats"><img src="/sites/all/themes/ftszen/img/stats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91473'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/3418">Atlanta</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>328</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/3392">Detroit</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    137 </td>
                <td class="views-field views-field-nid-1">
                    191 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/81519/overview"><span title='Southern Discomfort 2017'>Southern Discomfort 20<span class='ellipses'>...</span></span></a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91473" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92030'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/11046">Nantes</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>195</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/18439">Dirty River</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    173 </td>
                <td class="views-field views-field-nid-1">
                    22 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92021/overview">West Track Story V</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92030" class="boutlink has-stats"><img src="/sites/all/themes/ftszen/img/stats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91886'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/11056">Kallio</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>180</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/teams/3395/overview">Charm City</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    171 </td>
                <td class="views-field views-field-nid-1">
                    9 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92433/overview">2017 Boardwalk Empire</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91886" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92029'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/node/7929">Glasgow</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    140 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/teams/8083/overview">GO-GO Gent</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>212</span> </td>
                <td class="views-field views-field-nid-1">
                    72 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92021/overview">West Track Story V</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92029" class="boutlink has-stats"><img src="/sites/all/themes/ftszen/img/stats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91471'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/teams/7696/overview">Columbia</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>176</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/3405">Rocky Mtn.</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    134 </td>
                <td class="views-field views-field-nid-1">
                    42 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/81519/overview"><span title='Southern Discomfort 2017'>Southern Discomfort 20<span class='ellipses'>...</span></span></a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91471" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92028'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/node/11046">Nantes</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    151 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/node/11037">Antwerp</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>192</span> </td>
                <td class="views-field views-field-nid-1">
                    41 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92021/overview">West Track Story V</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92028" class="boutlink has-stats"><img src="/sites/all/themes/ftszen/img/stats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91470'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/3647">Jacksonville</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>286</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/3392">Detroit</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    133 </td>
                <td class="views-field views-field-nid-1">
                    153 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/81519/overview"><span title='Southern Discomfort 2017'>Southern Discomfort 20<span class='ellipses'>...</span></span></a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91470" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92439'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/node/11056">Kallio</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    158 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/teams/3399/overview">Arizona</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>160</span> </td>
                <td class="views-field views-field-nid-1">
                    2 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92433/overview">2017 Boardwalk Empire</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92439" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92027'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/teams/8083/overview">GO-GO Gent</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>217</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/18439">Dirty River</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    192 </td>
                <td class="views-field views-field-nid-1">
                    25 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92021/overview">West Track Story V</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92027" class="boutlink has-stats"><img src="/sites/all/themes/ftszen/img/stats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91469'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/teams/3425/overview">Madison</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>210</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/3405">Rocky Mtn.</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    154 </td>
                <td class="views-field views-field-nid-1">
                    56 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/81519/overview"><span title='Southern Discomfort 2017'>Southern Discomfort 20<span class='ellipses'>...</span></span></a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91469" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92528'></span><span class='time'></span> 4/9/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/node/7815">Molly Roger</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    156 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/node/3397">Big Easy</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>198</span> </td>
                <td class="views-field views-field-nid-1">
                    42 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/81519/overview"></a>
                </td>
                <td class="views-field views-field-view-node">
                    <a href="/bouts/92528/overview" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92026'></span><span class='time'></span> 4/8/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/node/7929">Glasgow</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    100 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/node/11046">Nantes</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>357</span> </td>
                <td class="views-field views-field-nid-1">
                    257 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92021/overview">West Track Story V</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/bouts/92026/overview" class="boutlink has-stats"><img src="/sites/all/themes/ftszen/img/stats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92012'></span><span class='time'></span> 4/8/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/10152">Greensboro</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>232</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/teams/5918/overview">Little City</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    92 </td>
                <td class="views-field views-field-nid-1">
                    140 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92021/overview"></a>
                </td>
                <td class="views-field views-field-view-node">
                    <a href="/bouts/92012/overview" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91885'></span><span class='time'></span> 4/8/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/3638">Santa Cruz</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>263</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/teams/3395/overview">Charm City</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    113 </td>
                <td class="views-field views-field-nid-1">
                    150 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92433/overview">2017 Boardwalk Empire</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91885" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92409'></span><span class='time'></span> 4/8/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/teams/10178/overview">Salisbury</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>229</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/13400">Morristown: JDB</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    126 </td>
                <td class="views-field views-field-nid-1">
                    103 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92433/overview"></a>
                </td>
                <td class="views-field views-field-view-node">
                    <a href="/bouts/92409/overview" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92025'></span><span class='time'></span> 4/8/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/teams/8083/overview">GO-GO Gent</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    80 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/node/11037">Antwerp</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>239</span> </td>
                <td class="views-field views-field-nid-1">
                    159 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92021/overview">West Track Story V</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/bouts/92025/overview" class="boutlink has-stats"><img src="/sites/all/themes/ftszen/img/stats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92437'></span><span class='time'></span> 4/8/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/teams/3399/overview">Arizona</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>220</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/13529">Ann Arbor</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    100 </td>
                <td class="views-field views-field-nid-1">
                    120 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92433/overview">2017 Boardwalk Empire</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92437" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92024'></span><span class='time'></span> 4/8/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <a href="/node/7929">Glasgow</a> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    184 </td>
                <td class="views-field views-field-title-1">
                    <span class='win'><a href="/node/18439">Dirty River</a></span> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    <span class='win'>240</span> </td>
                <td class="views-field views-field-nid-1">
                    56 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92021/overview">West Track Story V</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92024" class="boutlink has-stats"><img src="/sites/all/themes/ftszen/img/stats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91465'></span><span class='time'></span> 4/8/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/3647">Jacksonville</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>310</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/node/3405">Rocky Mtn.</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    111 </td>
                <td class="views-field views-field-nid-1">
                    199 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/81519/overview"><span title='Southern Discomfort 2017'>Southern Discomfort 20<span class='ellipses'>...</span></span></a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91465" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="odd official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='92023'></span><span class='time'></span> 4/8/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/11046">Nantes</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>247</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/teams/8083/overview">GO-GO Gent</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    132 </td>
                <td class="views-field views-field-nid-1">
                    115 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/92021/overview">West Track Story V</a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/92023" class="boutlink has-stats"><img src="/sites/all/themes/ftszen/img/stats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
            <tr class="even views-row-last official redundant-date">
                <td class="views-field views-field-field-bout-date-value">
                    <span nid='91464'></span><span class='time'></span> 4/8/17 </td>
                <td class="views-field views-field-nid-2">
                    <div class='wftda orgbadge tt-bottom' tooltip='Sanctioned By WFTDA'></div>
                </td>
                <td class="views-field views-field-title">
                    <span class='win'><a href="/node/3392">Detroit</a></span> </td>
                <td class="views-field views-field-field-bout-home-score-value">
                    <span class='win'>219</span> </td>
                <td class="views-field views-field-title-1">
                    <a href="/teams/7696/overview">Columbia</a> </td>
                <td class="views-field views-field-field-bout-visitor-score-value">
                    103 </td>
                <td class="views-field views-field-nid-1">
                    116 </td>
                <td class="views-field views-field-title-2">
                    <a href="/tournaments/81519/overview"><span title='Southern Discomfort 2017'>Southern Discomfort 20<span class='ellipses'>...</span></span></a> </td>
                <td class="views-field views-field-view-node">
                    <a href="/node/91464" class="boutlink no-stats"><img src="/sites/all/themes/ftszen/img/nostats.png" alt="" title="" width="14" height="14" />Stats</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
`

    describe('parseGamePage', function () {
        it('should parse 40 games', function () {
            let parsedGames = ftsGameParser.parseGamePage(mockPage);
            expect(parsedGames.length).toBe(40);
        });

        it('should convert numbers', function () {
            let game = ftsGameParser.parseGamePage(mockPage)[0];
            expect(game.homeId).toMatch(/\d+/);
            expect(game.awayId).toMatch(/\d+/);
            expect(game.homeScore).toMatch(/\d+/);
            expect(game.awayScore).toMatch(/\d+/);
            expect(game.gameId).toMatch(/\d+/);
        });

        it('should parse dates', function () {
            let game = ftsGameParser.parseGamePage(mockPage)[0];
            let actual = game.date;
            expect(actual.valueOf())
                .toEqual(moment('2017-04-15').valueOf());
        });
        
        it('should parse names', function () {
            let firstGame = ftsGameParser.parseGamePage(mockPage)[0];
            expect(firstGame.homeTeam)
                .toEqual('Croydon');
        });



    });
});