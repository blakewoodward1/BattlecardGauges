// Some DataSets are massive and will bring any web browser to its knees if you
// try to load the entire thing. To keep your app performing optimally, take
// advantage of filtering, aggregations, and group by's to bring down just the
// data your app needs. Do not include all columns in your data mapping file,
// just the ones you need.
//
// For additional documentation on how you can query your data, please refer to
// https://developer.domo.com/docs/dev-studio/dev-studio-data
domo.get('/data/v1/CompanyInfo')
    .then(function(CompanyInfo) {

        //Logo
        document.getElementById('Logo').innerHTML = '<img id="logo" src="' + CompanyInfo[0]['logo_url'] + '" alt="Company Logo" height="60" max-width="auto">';

        // document.body.style.background = "linear-gradient(0deg, " + CompanyInfo[0]['Primary_HEX'] + ", white 70%)";
        if (CompanyInfo[0]['Primary_HEX'] !== '') {
            
            var hexCode = CompanyInfo[0]['Primary_HEX']
            console.log('Hex provided')
            console.log(CompanyInfo[0]['Primary_HEX'])

        } else {
    
            var hexCode = '#99ccee'
            console.log(CompanyInfo[0]['Primary_HEX'])
            console.log('No hex provided')
        }


        //Revenue
        var companyRevenue = nFormatter(CompanyInfo[0]['revenue'])
        var companyFunding = nFormatter(CompanyInfo[0]['funding'])

        //Percent from avg
        var difference = CompanyInfo[0]['revenue'] - CompanyInfo[0]['avg_revenue']

        if(CompanyInfo[0]['avg_revenue'] == 0){
            var percentPre100 = difference / 1
        }
        else{
            var percentPre100 = difference / CompanyInfo[0]['avg_revenue']
        }

        var PercentComp = Math.round(percentPre100 * 100) / 10

        var PercentDifferenceFormatted = PercentComp + '%'
        var AbsoluteValuePercent = Math.abs(PercentComp)

        document.getElementById('percentRevenue').innerHTML = PercentDifferenceFormatted

        //NLP description
        if (CompanyInfo[0]['revenue'] > CompanyInfo[0]['avg_revenue']) {

            var response = CompanyInfo[0]['reference company name'] + "'s revenue is <span class='positivePercent'>" + PercentDifferenceFormatted + "</span> above the competitor average at a total of $" + companyRevenue + '.'

            document.getElementById('revenueSum').innerHTML = response;
            // document.getElementById('RevenueArrow').innerHTML = '<div class="triangle-up"></div>'
        } 

        else if(CompanyInfo[0]['revenue'] == CompanyInfo[0]['avg_revenue']){
            var response = CompanyInfo[0]['reference company name'] + "'s revenue is right on <br>the competitor average of <br>$" + nFormatter(CompanyInfo[0]['avg_revenue']) + '.'

            document.getElementById('revenueSum').innerHTML = response;
        }

        else {
            var response = CompanyInfo[0]['reference company name'] + "'s estimated annual revenue is <span class='negativePercent'>" + AbsoluteValuePercent + "% </span> below the competitor average of $" + nFormatter(CompanyInfo[0]['avg_revenue']) + '.'

            document.getElementById('revenueSum').innerHTML = response;
            // document.getElementById('RevenueArrow').innerHTML = '<div class="triangle-down"></div>'
        }


        //Display your Revenue at bottom of gauge
        document.getElementById('YourRevenue').innerHTML = "$" + companyRevenue + '<p class="subtext">annually</p>'

        //Actual Gauge
        var opts = {
            lines: 12, // The number of lines to draw
            angle: 0, // The length of each line
            lineWidth: 0.5, // The line thickness
            pointer: {
                length: 0.37, // The radius of the inner circle
                strokeWidth: 0.035, // The rotation offset
                color: '#000000' // Fill color
            },
            limitMax: 'false', // If true, the pointer will not go past the end of the gauge
            colorStart: hexCode, // Colors
            colorStop: hexCode, // just experiment with them
            strokeColor: '#E0E0E0', // to see which ones work best for you
            generateGradient: true
        };
        var target = document.getElementById('foo'); // your canvas element
        var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
        gauge.maxValue = CompanyInfo[0]['max_revenue']; // set max gauge value
        gauge.animationSpeed = 32; // set animation speed (32 is default value)
        gauge.set(CompanyInfo[0]['revenue']); // set actual value


        //Funding
        document.getElementById('YourFunding').innerHTML = "$" + nFormatter(CompanyInfo[0]['funding']) + '<p class="subtext">total</p>'

        //Percent from avg
        var difference = CompanyInfo[0]['funding'] - CompanyInfo[0]['avg_funding']
        console.log('Avg Funding: ', CompanyInfo[0]['avg_funding'])
        console.log('Company Funding: ', CompanyInfo[0]['funding'])


        if(CompanyInfo[0]['avg_funding'] == 0){
            var percentPre100 = difference / 1
        }
        else{
            var percentPre100 = difference / CompanyInfo[0]['avg_funding']
        }


        var PercentComp = Math.round(percentPre100 * 100) / 10

        var PercentDifferenceFormatted = PercentComp + '%'
        var AbsoluteValuePercent = Math.abs(PercentComp)

        document.getElementById('percentFunding').innerHTML = PercentDifferenceFormatted

        //NLP description
        if (CompanyInfo[0]['funding'] > CompanyInfo[0]['avg_funding']) {

            var response = CompanyInfo[0]['reference company name'] + ' has raised $' + companyFunding + " in funding. That's <span class='positivePercent'>" + PercentDifferenceFormatted + "</span> more than the competition."


            document.getElementById('fundingSum').innerHTML = response;

        } else if(CompanyInfo[0]['funding'] == CompanyInfo[0]['avg_funding']){
            var response = CompanyInfo[0]['reference company name'] + ' has raised $' + companyFunding + " in funding. That's right on the competitive average."

            document.getElementById('fundingSum').innerHTML = response;
        }

        else{
            var response = CompanyInfo[0]['reference company name'] + ' has raised $' + companyFunding + " in funding. That's <span class='negativePercent'>" + AbsoluteValuePercent + "% </span> less than the competition."

            document.getElementById('fundingSum').innerHTML = response;
        }

        //Actual Gauge
        var opts = {
            lines: 12, // The number of lines to draw
            angle: 0, // The length of each line
            lineWidth: 0.5, // The line thickness
            pointer: {
                length: 0.37, // The radius of the inner circle
                strokeWidth: 0.035, // The rotation offset
                color: '#000000' // Fill color
            },
            limitMax: 'false', // If true, the pointer will not go past the end of the gauge
            colorStart: hexCode, // Colors
            colorStop: hexCode, // just experiment with them
            strokeColor: '#E0E0E0', // to see which ones work best for you
            generateGradient: true
        };
        var target = document.getElementById('noo'); // your canvas element
        var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
        gauge.maxValue = CompanyInfo[0]['max_funding']; // set max gauge value
        gauge.animationSpeed = 32; // set animation speed (32 is default value)
        gauge.set(CompanyInfo[0]['funding']); // set actual value


        //Growth
        document.getElementById('YourGrowth').innerHTML = nFormatter(CompanyInfo[0]['growth']) + '<p class="subtext">new employees</p>'

        //Percent from avg
        var difference = CompanyInfo[0]['growth'] - CompanyInfo[0]['avg_growth']

        if(CompanyInfo[0]['avg_growth'] == 0){
            var percentPre100 = difference / 1
        }
        else{
            var percentPre100 = difference / CompanyInfo[0]['avg_growth']
        }

        var PercentComp = Math.round(percentPre100 * 100) / 10

        var PercentDifferenceFormatted = PercentComp + '%'
        var AbsoluteValuePercent = Math.abs(PercentComp)


        document.getElementById('percentGrowth').innerHTML = PercentDifferenceFormatted

        //NLP description
        if (CompanyInfo[0]['growth'] > CompanyInfo[0]['avg_growth']) {

            var response = CompanyInfo[0]['reference company name'] + "'s workforce has grown at <span class='positivePercent'>" + PercentDifferenceFormatted + "</span>. That's " + nFormatter(CompanyInfo[0]['growth']) + ' new employees annually.'

            document.getElementById('growthSum').innerHTML = response;
        } 

        else if(CompanyInfo[0]['growth'] == CompanyInfo[0]['avg_growth']){
            var response = CompanyInfo[0]['reference company name'] + "'s workforce has grown <span class='positivePercent'>" + PercentDifferenceFormatted + "</span>. That's " + nFormatter(CompanyInfo[0]['growth']) + ' new employees annually.'

            document.getElementById('growthSum').innerHTML = response;
        }

        else {
            var response = CompanyInfo[0]['reference company name'] + "'s annual employee growth is <span class='negativePercent'>" + AbsoluteValuePercent + '%</span> below the industry average of ' + nFormatter(CompanyInfo[0]['avg_growth']) + '.'

            document.getElementById('growthSum').innerHTML = response;
        }

        //Actual Gauge
        var opts = {
            lines: 12, // The number of lines to draw
            angle: 0, // The length of each line
            lineWidth: 0.5, // The line thickness
            pointer: {
                length: 0.37, // The radius of the inner circle
                strokeWidth: 0.035, // The rotation offset
                color: '#000000' // Fill color
            },
            limitMax: 'false', // If true, the pointer will not go past the end of the gauge
            colorStart: hexCode, // Colors
            colorStop: hexCode, // just experiment with them
            strokeColor: '#E0E0E0', // to see which ones work best for you
            generateGradient: true
        };
        var target = document.getElementById('poo'); // your canvas element
        var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
        gauge.maxValue = CompanyInfo[0]['max_growth']; // set max gauge value
        gauge.animationSpeed = 32; // set animation speed (32 is default value)
        gauge.set(CompanyInfo[0]['growth']); // set actual value



        //News
        document.getElementById('YourPress').innerHTML = nFormatter(CompanyInfo[0]['post_last_week']) + '<p class="subtext">news articles</p>'

        //Percent from avg
        var difference = CompanyInfo[0]['post_last_week'] - CompanyInfo[0]['avg_post']

        if(CompanyInfo[0]['avg_post'] == 0){
            var percentPre100 = difference / 1
        }
        else{
            var percentPre100 = difference / CompanyInfo[0]['avg_post']
        }

        var PercentComp = Math.round(percentPre100 * 100) / 10

        var PercentDifferenceFormatted = PercentComp + '%'
        var AbsoluteValuePercent = Math.abs(PercentComp)


        document.getElementById('percentPost').innerHTML = PercentDifferenceFormatted

        //Actual Gauge
        var opts = {
            lines: 12, // The number of lines to draw
            angle: 0, // The length of each line
            lineWidth: 0.5, // The line thickness
            pointer: {
                length: 0.37, // The radius of the inner circle
                strokeWidth: 0.035, // The rotation offset
                color: '#000000' // Fill color
            },
            limitMax: 'false', // If true, the pointer will not go past the end of the gauge
            colorStart: hexCode, // Colors
            colorStop: hexCode, // just experiment with them
            strokeColor: '#E0E0E0', // to see which ones work best for you
            generateGradient: true
        };
        var target = document.getElementById('zoo'); // your canvas element
        var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
        gauge.maxValue = CompanyInfo[0]['max_post']; // set max gauge value
        gauge.animationSpeed = 32; // set animation speed (32 is default value)
        gauge.set(CompanyInfo[0]['post_last_week']); // set actual value

        //NLP description
        if (CompanyInfo[0]['post_last_week'] > CompanyInfo[0]['avg_post']) {

            var response = "Read all about it! " + CompanyInfo[0]['reference company name'] + " is in the news <span class='positivePercent'>" + PercentDifferenceFormatted + '</span> more<br> than their competitors.'

            document.getElementById('postSum').innerHTML = response;
        } else if (CompanyInfo[0]['post_last_week'] == CompanyInfo[0]['avg_post']) {
            var response = "There were " + nFormatter(CompanyInfo[0]['post_last_week']) + ' articles about ' + CompanyInfo[0]['reference company name'] + " last week. That's right on the competitor average."

            document.getElementById('postSum').innerHTML = response;
        } else {
            var response = "There were " + nFormatter(CompanyInfo[0]['post_last_week']) + ' articles about ' + CompanyInfo[0]['reference company name'] + " last week. That's <span class='negativePercent'>" + AbsoluteValuePercent + '%</span> less than the competitor average.'

            document.getElementById('postSum').innerHTML = response;
        }



    });



//Number abbreviation
function nFormatter(num, digits) {
    var si = [{
                value: 1E18,
                symbol: "E"
            },
            {
                value: 1E15,
                symbol: "P"
            },
            {
                value: 1E12,
                symbol: "T"
            },
            {
                value: 1E9,
                symbol: "B"
            },
            {
                value: 1E6,
                symbol: "M"
            },
            {
                value: 1E3,
                symbol: "k"
            }
        ],
        rx = /\.0+$|(\.[0-9]*[1-9])0+$/,
        i;
    for (i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
        }
    }
    return num.toFixed(digits).replace(rx, "$1");

}