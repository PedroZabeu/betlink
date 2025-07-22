import { test, expect } from '@playwright/test';

test.describe('Feature 1.3: Role-Based Placeholder Pages', () => {
  test('navigation menu is visible on all pages', async ({ page }) => {
    // Check homepage
    await page.goto('http://127.0.0.1:3000');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByText('BetLink')).toBeVisible();
    
    // Check navigation links exist
    await expect(page.getByRole('link', { name: /Home/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Admin/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Meus Canais/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Dashboard/ })).toBeVisible();
  });

  test('can navigate to admin page', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000');
    
    // Click admin link
    await page.getByRole('link', { name: /Admin/ }).click();
    
    // Verify we're on admin page
    await expect(page).toHaveURL('http://127.0.0.1:3000/admin');
    await expect(page.getByRole('heading', { name: 'Painel Administrativo' })).toBeVisible();
    await expect(page.getByText('Master')).toBeVisible();
    await expect(page.getByText('Gerenciar Tipsters')).toBeVisible();
  });

  test('can navigate to meus-canais page', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000');
    
    // Click meus canais link
    await page.getByRole('link', { name: /Meus Canais/ }).click();
    
    // Verify we're on meus-canais page
    await expect(page).toHaveURL('http://127.0.0.1:3000/meus-canais');
    await expect(page.getByRole('heading', { name: 'Meus Canais' })).toBeVisible();
    await expect(page.getByText('Tipster')).toBeVisible();
    await expect(page.getByText('Solicitar Novo Canal')).toBeVisible();
  });

  test('can navigate to dashboard page', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000');
    
    // Click dashboard link
    await page.getByRole('link', { name: /Dashboard/ }).click();
    
    // Verify we're on dashboard page
    await expect(page).toHaveURL('http://127.0.0.1:3000/dashboard');
    await expect(page.getByRole('heading', { name: 'Meu Dashboard' })).toBeVisible();
    await expect(page.getByText('Cliente')).toBeVisible();
    await expect(page.getByText('Minhas Assinaturas Ativas')).toBeVisible();
  });

  test('admin page shows correct placeholder content', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/admin');
    
    // Check all admin features are displayed
    await expect(page.getByText('Gerenciar Tipsters')).toBeVisible();
    await expect(page.getByText('Aprovar Canais')).toBeVisible();
    await expect(page.getByText('Gerenciar Clientes')).toBeVisible();
    await expect(page.getByText('Dashboard de Métricas')).toBeVisible();
    await expect(page.getByText('Configurações')).toBeVisible();
    await expect(page.getByText('Logs de Atividade')).toBeVisible();
  });

  test('meus-canais page shows tipster content', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/meus-canais');
    
    // Check channel examples
    await expect(page.getByText('Canal Premium ⚽')).toBeVisible();
    await expect(page.getByText('Tips Básicos 🎯')).toBeVisible();
    
    // Check stats summary
    await expect(page.getByText('Total de Canais')).toBeVisible();
    await expect(page.getByText('Total de Assinantes')).toBeVisible();
    await expect(page.getByText('Receita Total')).toBeVisible();
    await expect(page.getByText('ROI Médio Geral')).toBeVisible();
  });

  test('dashboard page shows client content', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/dashboard');
    
    // Check subscription cards
    await expect(page.getByText('Minhas Assinaturas Ativas')).toBeVisible();
    await expect(page.getByText('Canal Premium ⚽')).toBeVisible();
    
    // Check performance summary
    await expect(page.getByText('Resumo de Performance')).toBeVisible();
    await expect(page.getByText('Assinaturas Ativas')).toBeVisible();
    await expect(page.getByText('ROI Total do Mês')).toBeVisible();
    
    // Check quick actions
    await expect(page.getByText('Ações Rápidas')).toBeVisible();
    await expect(page.getByText('Gerenciar Pagamentos')).toBeVisible();
  });

  test('navigation highlights current page', async ({ page }) => {
    // Test homepage
    await page.goto('http://127.0.0.1:3000');
    const homeLink = page.getByRole('link', { name: /Home/ });
    await expect(homeLink).toHaveClass(/bg-blue-50 text-blue-600/);
    
    // Test admin page
    await page.goto('http://127.0.0.1:3000/admin');
    const adminLink = page.getByRole('link', { name: /Admin/ });
    await expect(adminLink).toHaveClass(/bg-blue-50 text-blue-600/);
  });

  test('all pages are responsive', async ({ page }) => {
    const pages = ['/', '/admin', '/meus-canais', '/dashboard'];
    
    for (const pagePath of pages) {
      await page.goto(`http://127.0.0.1:3000${pagePath}`);
      
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.locator('nav')).toBeVisible();
      
      // Test desktop viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      await expect(page.locator('nav')).toBeVisible();
    }
  });
});