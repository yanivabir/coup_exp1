// generated with brms 2.16.3
functions {
 /* compute correlated group-level effects
  * Args: 
  *   z: matrix of unscaled group-level effects
  *   SD: vector of standard deviation parameters
  *   L: cholesky factor correlation matrix
  * Returns: 
  *   matrix of scaled group-level effects
  */ 
  matrix scale_r_cor(matrix z, vector SD, matrix L) {
    // r is stored in another dimension order than z
    return transpose(diag_pre_multiply(SD, L) * z);
  }
  /* cumulative-logit log-PDF for a single response
   * Args:
   *   y: response category
   *   mu: latent mean parameter
   *   disc: discrimination parameter
   *   thres: ordinal thresholds
   * Returns:
   *   a scalar to be added to the log posterior
   */
   real cumulative_logit_lpmf(int y, real mu, real disc, vector thres) {
     int nthres = num_elements(thres);
     if (y == 1) {
       return log_inv_logit(disc * (thres[1] - mu));
     } else if (y == nthres + 1) {
       return log1m_inv_logit(disc * (thres[nthres] - mu));
     } else {
       return log_diff_exp(
         log_inv_logit(disc * (thres[y] - mu)), 
         log_inv_logit(disc * (thres[y - 1] - mu))
       );
     }
   }
  /* cumulative-logit log-PDF for a single response and merged thresholds
   * Args:
   *   y: response category
   *   mu: latent mean parameter
   *   disc: discrimination parameter
   *   thres: vector of merged ordinal thresholds
   *   j: start and end index for the applid threshold within 'thres'
   * Returns:
   *   a scalar to be added to the log posterior
   */
   real cumulative_logit_merged_lpmf(int y, real mu, real disc, vector thres, int[] j) {
     return cumulative_logit_lpmf(y | mu, disc, thres[j[1]:j[2]]);
   }
  /* ordered-logistic log-PDF for a single response and merged thresholds
   * Args:
   *   y: response category
   *   mu: latent mean parameter
   *   thres: vector of merged ordinal thresholds
   *   j: start and end index for the applid threshold within 'thres'
   * Returns:
   *   a scalar to be added to the log posterior
   */
   real ordered_logistic_merged_lpmf(int y, real mu, vector thres, int[] j) {
     return ordered_logistic_lpmf(y | mu, thres[j[1]:j[2]]);
   }
}
data {
  int<lower=1> N;  // total number of observations
  int<lower=1> N_useful;  // number of observations
  int Y_useful[N_useful];  // response variable
  int<lower=2> nthres_useful;  // number of thresholds
  int<lower=1> Ksp_useful;  // number of special effects terms
  int idxl_useful_x_1[N_useful];  // matching indices
  int<lower=1> N_x;  // number of observations
  vector[N_x] Y_x;  // response variable
  int<lower=0> Nmi_x;  // number of missings
  int<lower=1> Jmi_x[Nmi_x];  // positions of missings
  int<lower=1> K_x;  // number of population-level effects
  matrix[N_x, K_x] X_x;  // population-level design matrix
  int<lower=1> N_waited;  // number of observations
  int Y_waited[N_waited];  // response variable
  int<lower=1> K_waited;  // number of population-level effects
  matrix[N_waited, K_waited] X_waited;  // population-level design matrix
  int<lower=1> Ksp_waited;  // number of special effects terms
  int idxl_waited_x_1[N_waited];  // matching indices
  // data for group-level effects of ID 1
  int<lower=1> N_1;  // number of grouping levels
  int<lower=1> M_1;  // number of coefficients per level
  int<lower=1> J_1_x[N_x];  // grouping indicator per observation
  // group-level predictor values
  vector[N_x] Z_1_x_1;
  vector[N_x] Z_1_x_2;
  int<lower=1> NC_1;  // number of group-level correlations
  // data for group-level effects of ID 2
  int<lower=1> N_2;  // number of grouping levels
  int<lower=1> M_2;  // number of coefficients per level
  int<lower=1> J_2_x[N_x];  // grouping indicator per observation
  // group-level predictor values
  vector[N_x] Z_2_x_1;
  // data for group-level effects of ID 3
  int<lower=1> N_3;  // number of grouping levels
  int<lower=1> M_3;  // number of coefficients per level
  int<lower=1> J_3_waited[N_waited];  // grouping indicator per observation
  // group-level predictor values
  vector[N_waited] Z_3_waited_1;
  vector[N_waited] Z_3_waited_2;
  int<lower=1> NC_3;  // number of group-level correlations
  // data for group-level effects of ID 4
  int<lower=1> N_4;  // number of grouping levels
  int<lower=1> M_4;  // number of coefficients per level
  int<lower=1> J_4_waited[N_waited];  // grouping indicator per observation
  // group-level predictor values
  vector[N_waited] Z_4_waited_1;
  vector[N_waited] Z_4_waited_2;
  int<lower=1> NC_4;  // number of group-level correlations
  int prior_only;  // should the likelihood be ignored?
}
transformed data {
  int Kc_x = K_x - 1;
  matrix[N_x, Kc_x] Xc_x;  // centered version of X_x without an intercept
  vector[Kc_x] means_X_x;  // column means of X_x before centering
  int Kc_waited = K_waited - 1;
  matrix[N_waited, Kc_waited] Xc_waited;  // centered version of X_waited without an intercept
  vector[Kc_waited] means_X_waited;  // column means of X_waited before centering
  for (i in 2:K_x) {
    means_X_x[i - 1] = mean(X_x[, i]);
    Xc_x[, i - 1] = X_x[, i] - means_X_x[i - 1];
  }
  for (i in 2:K_waited) {
    means_X_waited[i - 1] = mean(X_waited[, i]);
    Xc_waited[, i - 1] = X_waited[, i] - means_X_waited[i - 1];
  }
}
parameters {
  ordered[nthres_useful] Intercept_useful;  // temporary thresholds for centered predictors
  vector[Ksp_useful] bsp_useful;  // special effects coefficients
  vector[Nmi_x] Ymi_x;  // estimated missings
  vector[Kc_x] b_x;  // population-level effects
  real Intercept_x;  // temporary intercept for centered predictors
  real<lower=0> sigma_x;  // dispersion parameter
  vector[Kc_waited] b_waited;  // population-level effects
  real Intercept_waited;  // temporary intercept for centered predictors
  vector[Ksp_waited] bsp_waited;  // special effects coefficients
  vector<lower=0>[M_1] sd_1;  // group-level standard deviations
  matrix[M_1, N_1] z_1;  // standardized group-level effects
  cholesky_factor_corr[M_1] L_1;  // cholesky factor of correlation matrix
  vector<lower=0>[M_2] sd_2;  // group-level standard deviations
  vector[N_2] z_2[M_2];  // standardized group-level effects
  vector<lower=0>[M_3] sd_3;  // group-level standard deviations
  matrix[M_3, N_3] z_3;  // standardized group-level effects
  cholesky_factor_corr[M_3] L_3;  // cholesky factor of correlation matrix
  vector<lower=0>[M_4] sd_4;  // group-level standard deviations
  matrix[M_4, N_4] z_4;  // standardized group-level effects
  cholesky_factor_corr[M_4] L_4;  // cholesky factor of correlation matrix
}
transformed parameters {
  real<lower=0> disc_useful = 1;  // discrimination parameters
  matrix[N_1, M_1] r_1;  // actual group-level effects
  // using vectors speeds up indexing in loops
  vector[N_1] r_1_x_1;
  vector[N_1] r_1_x_2;
  vector[N_2] r_2_x_1;  // actual group-level effects
  matrix[N_3, M_3] r_3;  // actual group-level effects
  // using vectors speeds up indexing in loops
  vector[N_3] r_3_waited_1;
  vector[N_3] r_3_waited_2;
  vector[N_3] r_3_waited_3;
  matrix[N_4, M_4] r_4;  // actual group-level effects
  // using vectors speeds up indexing in loops
  vector[N_4] r_4_waited_1;
  vector[N_4] r_4_waited_2;
  vector[N_4] r_4_waited_3;
  // compute actual group-level effects
  r_1 = scale_r_cor(z_1, sd_1, L_1);
  r_1_x_1 = r_1[, 1];
  r_1_x_2 = r_1[, 2];
  r_2_x_1 = (sd_2[1] * (z_2[1]));
  // compute actual group-level effects
  r_3 = scale_r_cor(z_3, sd_3, L_3);
  r_3_waited_1 = r_3[, 1];
  r_3_waited_2 = r_3[, 2];
  r_3_waited_3 = r_3[, 3];
  // compute actual group-level effects
  r_4 = scale_r_cor(z_4, sd_4, L_4);
  r_4_waited_1 = r_4[, 1];
  r_4_waited_2 = r_4[, 2];
  r_4_waited_3 = r_4[, 3];
}
model {
  // likelihood including constants
  if (!prior_only) {
    // vector combining observed and missing responses
    vector[N_x] Yl_x = Y_x;
    // initialize linear predictor term
    vector[N_useful] mu_useful = rep_vector(0.0, N_useful);
    // initialize linear predictor term
    vector[N_x] mu_x = Intercept_x + Xc_x * b_x;
    // initialize linear predictor term
    vector[N_waited] mu_waited = Intercept_waited + Xc_waited * b_waited;
    Yl_x[Jmi_x] = Ymi_x;
    for (n in 1:N_useful) {
      // add more terms to the linear predictor
      mu_useful[n] += (bsp_useful[1]) * Yl_x[idxl_useful_x_1[n]];
    }
    for (n in 1:N_x) {
      // add more terms to the linear predictor
      mu_x[n] += r_1_x_1[J_1_x[n]] * Z_1_x_1[n] + r_1_x_2[J_1_x[n]] * Z_1_x_2[n] + r_2_x_1[J_2_x[n]] * Z_2_x_1[n];
    }
    for (n in 1:N_waited) {
      // add more terms to the linear predictor
      mu_waited[n] += (bsp_waited[1] + r_3_waited_3[J_3_waited[n]] + r_4_waited_3[J_4_waited[n]]) * Yl_x[idxl_waited_x_1[n]] + r_3_waited_1[J_3_waited[n]] * Z_3_waited_1[n] + r_3_waited_2[J_3_waited[n]] * Z_3_waited_2[n] + r_4_waited_1[J_4_waited[n]] * Z_4_waited_1[n] + r_4_waited_2[J_4_waited[n]] * Z_4_waited_2[n];
    }
    for (n in 1:N_useful) {
      target += ordered_logistic_lpmf(Y_useful[n] | mu_useful[n], Intercept_useful);
    }
    target += normal_lpdf(Yl_x | mu_x, sigma_x);
    target += bernoulli_logit_lpmf(Y_waited | mu_waited);
  }
  // priors including constants
  target += std_normal_lpdf(Intercept_useful);
  target += normal_lpdf(bsp_useful | 1, 1e-10);
  target += std_normal_lpdf(b_x);
  target += std_normal_lpdf(Intercept_x);
  target += normal_lpdf(sigma_x | 1, 1e-10)
    - 1 * normal_lccdf(0 | 1, 1e-10);
  target += std_normal_lpdf(b_waited);
  target += std_normal_lpdf(Intercept_waited);
  target += std_normal_lpdf(bsp_waited);
  target += std_normal_lpdf(sd_1)
    - 2 * std_normal_lccdf(0);
  target += std_normal_lpdf(to_vector(z_1));
  target += lkj_corr_cholesky_lpdf(L_1 | 2);
  target += std_normal_lpdf(sd_2)
    - 1 * std_normal_lccdf(0);
  target += std_normal_lpdf(z_2[1]);
  target += std_normal_lpdf(sd_3)
    - 3 * std_normal_lccdf(0);
  target += std_normal_lpdf(to_vector(z_3));
  target += lkj_corr_cholesky_lpdf(L_3 | 2);
  target += std_normal_lpdf(sd_4)
    - 3 * std_normal_lccdf(0);
  target += std_normal_lpdf(to_vector(z_4));
  target += lkj_corr_cholesky_lpdf(L_4 | 2);
}
generated quantities {
  // compute actual thresholds
  vector[nthres_useful] b_useful_Intercept = Intercept_useful;
  // actual population-level intercept
  real b_x_Intercept = Intercept_x - dot_product(means_X_x, b_x);
  // actual population-level intercept
  real b_waited_Intercept = Intercept_waited - dot_product(means_X_waited, b_waited);
  // compute group-level correlations
  corr_matrix[M_1] Cor_1 = multiply_lower_tri_self_transpose(L_1);
  vector<lower=-1,upper=1>[NC_1] cor_1;
  // compute group-level correlations
  corr_matrix[M_3] Cor_3 = multiply_lower_tri_self_transpose(L_3);
  vector<lower=-1,upper=1>[NC_3] cor_3;
  // compute group-level correlations
  corr_matrix[M_4] Cor_4 = multiply_lower_tri_self_transpose(L_4);
  vector<lower=-1,upper=1>[NC_4] cor_4;
  // extract upper diagonal of correlation matrix
  for (k in 1:M_1) {
    for (j in 1:(k - 1)) {
      cor_1[choose(k - 1, 2) + j] = Cor_1[j, k];
    }
  }
  // extract upper diagonal of correlation matrix
  for (k in 1:M_3) {
    for (j in 1:(k - 1)) {
      cor_3[choose(k - 1, 2) + j] = Cor_3[j, k];
    }
  }
  // extract upper diagonal of correlation matrix
  for (k in 1:M_4) {
    for (j in 1:(k - 1)) {
      cor_4[choose(k - 1, 2) + j] = Cor_4[j, k];
    }
  }
}