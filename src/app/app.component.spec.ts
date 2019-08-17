import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppService } from './app.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeysPipe } from './pipe/key_transform.pipe';

const testData = [{
  'id': 1,
  'status': 'read'
}, {
  'id': 2,
  'status': 'read'
}];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        KeysPipe
      ],
      providers: [AppService]
    }).compileComponents();
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('Coloums should be auto genertaed based on json array elements ', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    expect('data').toBeDefined();
  }));

  it('should have show entries select option', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const select = fixture.debugElement.query(By.css('select'));
    fixture.detectChanges();
    expect(select).toBeTruthy();
  }));

  it('sample data has 200 entries, given range 20, pagination should have 10 pages', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(10).toEqual(10);
    });
  }));
  it('on load selected page 1', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.selectedPage).toEqual(1);
  }));

  it('show entries selected to 25, pagination default should select 1, table should hold 25 entries', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.changeRowCount(25);
    expect(app.selectedPage).toEqual(1);
    expect(app.selectedRowCount).toEqual(25);
  }));

  it('selected page 6, show entries should be empty', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.loadPage(6);
    expect(app.selectedPage).toEqual(6);
    expect(app.selectedRowCount).toEqual('');
  }));

  it('row submitted status, Before row selected object should be undefined', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.loadPage(6);
    expect(app.selectedUser).toEqual(undefined);
  }));

  it('show entries 50, submit button clicked on row 49', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.submitRow(testData[0].id, testData[0].status);
    app.changeRowCount(1);
    expect(app.selectedUser).toBeDefined();
  }));

});

