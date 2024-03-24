---
layout: default
title: Home
home: active
cv: passive
research: passive
contact: passive
---
<div class="colnew">
	<div class="side">
		<img src="img/ckontz-300px.jpg" alt="Christian Kontz" class="img-circle" style="float: center; padding:25px; max-width: 95%;  min-width: 65%; height: auto;">
		<!-- <br> -->
	</div>
	<div class="main">
		<div style="color:black; font-size: larger; text-align: justify; display:inline-block;  min-width: 75%;"> 
		<!-- <br> -->
		<br>
		<b>
		Hi, I'm Christian Kontz. I'm a Ph.D. candidate in Finance at the Stanford Graduate School of Business.
		</b>
		<br>
		<br>
		I spend most of my time thinking about the implications of climate change, ESG and sustainability, and innovation for asset prices and corporate finance. You can learn more about my research <a href="/research">here</a>.
			<br>
	</div>
</div>
<br>
<br>
<hr class="styled-hr" style="width:100%;">
<div>
<h3> Working Papers </h3>
<!-- <br> -->
<ul>
	<li>
	<a style="color:black; font-weight: bold;" href="../files/KONTZ_DoESGInvestorsCareAboutCarbonEmissions.pdf" target="_blank">"Do ESG investors care about carbon emissions? Evidence from securitized auto loans" [Updated 11/2023]
	</a> 
	<br>
	<a id="[Abstract]" href="#" onclick="show('esgabstract');">[Abstract]</a>
	&#160;
	<a href="../files/KONTZ_DoESGInvestorsCareAboutCarbonEmissions.pdf" target="_blank">[Draft]</a>
	&#160;
	<a href="https://ssrn.com/abstract=4357312" target="_blank">[SSRN]</a>
	&#160;
	<a id="[BibTex]" href="#" onclick="show('kontz2023esg');">[BibTex]</a>
	<div id="esgabstract" style="display: none; text-align: justify;">
		Securitized auto loans present a clean empirical setting to study the effects of ESG investing on equilibrium asset prices and quantities. 
		I estimate that the convenience yield of ESG investments increased almost threefold from 0.14% in 2017 to 0.39% p.a. in 2022.
		However, I document that ESG mutual funds invest more in auto ABS whose issuers have higher ESG scores, even if those securities finance higher emissions vehicles.
		The market's focus on ESG scores instead of CO2 emissions lowers the cost of capital for high-emission auto ABS by 6%; likely driven by the positive correlation of ESG scores and CO2 emissions.
		These findings raise questions about the effectiveness of ESG investing in addressing environmental externalities.
	</div>
	<div id="kontz2023esg" style="display: none;">
@techreport{kontz2023esg,<br>
	&#160;&#160;&#160;title={Do ESG investors care about carbon emissions? Evidence from securitized auto loans},<br>
	&#160;&#160;&#160;author={Kontz, Christian},<br>
	&#160;&#160;&#160;type={Working Paper},<br>
	&#160;&#160;&#160;institution={Stanford University},<br>
	&#160;&#160;&#160;year={2023},<br>
}<br>
</div>
</li>
</ul>

<hr class="styled-hr" style="width:100%;">
<h3> Work in Progress </h3>
<ul>
<li>
<a style="color:black; font-weight: bold;" href="/research">"The Real Cost of Benchmarking"</a> (with <a href="https://shanson93.github.io/">Sebastian Hanson</a>)
</li>
<a id="[Abstract]" href="#" onclick="show('bmiabstract');">[Abstract]</a>
<div id="bmiabstract" style="display: none; text-align: justify;">
		We document a new channel through which passive investing and benchmarking affect firm behavior.
			We causally show that increases in a stock's benchmarking intensity lead to higher CAPM &beta;. Stocks whose benchmarking intensity increases by more than 5p.p. have 17% higher CAPM &beta;s after 9 months. 
			We confirm that the change in CAPM &beta; is not driven by changes in firm fundamentals. We argue that the change in CAPM &beta; is due to the fact that firms with higher benchmarking intensity are exposed to correlated investor demand shocks.
			We use an instrumental variable design to show that firms which experience higher CAPM &beta;s because of higher benchmarking intensity have 5% less capital and hold 15% more cash after 5 years.
			Our results suggest that benchmarking has important real effects on firm behavior and that these effects are driven by changes in the perceived cost of capital. 
	</div>
<br>
<br>
<li>
<a style="color:black; font-weight: bold;" href="/research">"ESG induced capital misallocation: Is ESG doing good, by doing well?"</a>
</li>
<a id="[Abstract]" href="#" onclick="show('mrkabstract');">[Abstract]</a>
<div id="mrkabstract" style="display: none; text-align: justify;">
	This paper studies the impact of environmental, social, and governance (ESG) investing on the real economy. Using within industry-year variation, I show that 1.) firms with high ESG ratings have low marginal revenue products of capital (MRPK), while, 2.) firms with high sales per tCO2 emission have high MRPKs. This implies that reallocating capital to firms with high ESG ratings lowers allocative efficiency while reallocating capital to greener firms increases it. I further document that 3.) capital investment by firms with high ESG ratings is less sensitive to Tobin’s Q, 4.) capital allocation decisions of ESG mutual funds are not sensitive to the MRPK of their portfolio firms. Motivated by these facts, I structurally estimate a dynamic investment model featuring convenience yields on ESG assets and a CO2 externality. I use the model to explore the implications of ESG investing for misallocation of capital, aggregate total factor productivity, and as a tool for climate change mitigation. I simulate a counterfactual economy where capital investors internalize the CO2 emission instead of ESG convenience yields.
	</div>
</ul>		
<br>
<br>
<br>
<!-- BIBTEX SCRIPTS -->
<script>
function show(id) {
	var x = document.getElementById(id);
	if (x.style.display === "none") {
		x.style.display = "inline-block";
	} else {
		x.style.display = "none";
	}
}
</script>
